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
                path: 'currentExercise',
                model: Exercise
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