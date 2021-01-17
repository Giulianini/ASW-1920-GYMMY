const params = require('../routes/params')
const responses = require('./util/responses')

const User = require('../models/User')
const TrainingCard = require('../models/TrainingCard')
const TrainingExecution = require('../models/TrainingExecution')
const Exercise = require('../models/Exercise')

exports.getExecution = async function(req, res) {
    const username = req.params[params.USERNAME_PARAM]

    const userExists = await User.exists({ username: username })
    if (!userExists) {
        return responses.notFound(res)('User not found')
    }

    const user = await User.findOne({ username: username }).exec()
    const userId = user._id

    const foundExecution = await TrainingExecution.findOne({ user: userId }).exec()
    if (!foundExecution) {
        return responses.notFound(res)('Execution not found')
    }

    try {
        const populatedExecution = await foundExecution.populate({
                path: 'user',
                model: User,
                select: '-password'
            })
            .populate({
                path: 'card',
                model: TrainingCard
            })
            .populate({
                path: 'completion.exercise',
                model: Exercise
            })
            .execPopulate()
        responses.json(res)(populatedExecution)
    } catch (err) {
        responses.error(res)(err)
    }
}

exports.createExecution = async function(req, res) {
    const username = req.params[params.USERNAME_PARAM]
    const cardId = req.body.card

    const userExists = await User.exists({ username: username })
    if (!userExists) {
        return responses.notFound(res)('User not found')
    }

    const cardExists = await TrainingCard.exists({ _id: cardId })
    if (!cardExists) {
        return responses.badRequest(res)('Card not found')
    }

    const user = await User.findOne({ username: username }).exec()
    const userId = user._id

    const executionExists = await TrainingExecution.exists({ user: userId })
    if (executionExists) {
        return responses.conflict(res)
    }

    const exercises = await TrainingCard.findOne({ _id: cardId })
        .map(card => card.exercises)
        .exec();
    const exerciseIds = exercises.map(exercise => exercise.exercise)

    const exerciseCompletions = exerciseIds.map(exerciseId => {
        return { exercise: exerciseId, done: false }
    })

    const execution = new TrainingExecution({
        user: userId,
        card: cardId,
        startTime: Date.now(),
        completion: exerciseCompletions
    })

    try {
        const savedExecution = await execution.save();
        responses.created(res)(savedExecution)
    } catch (err) {
        responses.error(res)(err)
    }
}

exports.updateExecution = async function(req, res) {
    const username = req.params[params.USERNAME_PARAM]
    const command = req.body.command
    const exerciseIndex = req.body.exerciseIndex

    const userExists = await User.exists({ username: username })
    if (!userExists) {
        return responses.notFound(res)('User not found')
    }

    const user = await User.findOne({ username: username }).exec()
    const userId = user._id

    const foundExecution = await TrainingExecution.findOne({ user: userId }).exec()
    if (!foundExecution) {
        return responses.notFound(res)('Execution not found')
    }

    if (!command) {
        return responses.badRequest(res)('command field is required')
    }
    if (exerciseIndex === undefined) {
        return responses.badRequest(res)('exerciseIndex field is required')
    }


    switch (command) {
        case 'startExercise':
            const completionLength = foundExecution.completion.length
            if (exerciseIndex >= completionLength || exerciseIndex < 0) {
                return responses.badRequest(res)('Exercise index out of bounds')
            }
            try {
                foundExecution.currentExercise = exerciseIndex
                await foundExecution.save()
                responses.noContent(res)
            } catch (err) {
                responses.error(res)(err)
            }
            break
        case 'completeExercise':
            try {
                foundExecution.completion[foundExecution.currentExercise].completed = true
                await foundExecution.save()
                responses.noContent(res)
            } catch (err) {
                responses.error(res)(err)
            }
            break
    }
}

exports.removeExecution = async function(req, res) {
    const username = req.params[params.USERNAME_PARAM]

    const userExists = await User.exists({ username: username })
    if (!userExists) {
        return responses.notFound(res)('User not found')
    }

    const user = await User.findOne({ username: username }).exec()
    const userId = user._id

    const foundExecution = await TrainingExecution.findOne({ user: userId }).exec()
    if (!foundExecution) {
        return responses.notFound(res)('Execution not found')
    }

    try {
        await TrainingExecution.deleteOne({ user: userId }).exec()
        responses.noContent(res)
    } catch (err) {
        responses.error(res)(err)
    }
}