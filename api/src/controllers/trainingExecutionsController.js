const params = require('../routes/params')
const responses = require('./util/responses')

const User = require('../models/User')
const TrainingCard = require('../models/TrainingCard')
const TrainingExecution = require('../models/TrainingExecution')
const Exercise = require('../models/Exercise')
const Location = require('../models/Location')
const LocationCapacity = require('../models/LocationCapacity')
const Statistics = require('../models/Statistics')

const {Semaphore} = require('await-semaphore');

exports.getExecution = async function (req, res) {
    const username = req.params[params.USERNAME_PARAM]

    const userExists = await User.exists({username: username})
    if (!userExists) {
        return responses.notFound(res)('User not found')
    }

    const user = await User.findOne({username: username}).exec()
    const userId = user._id

    const foundExecution = await TrainingExecution.findOne({user: userId}).exec()
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
                path: 'currentLocation',
                model: Location
            })
            .populate({
                path: 'completion.exercise',
                model: Exercise
            })
            .populate({
                path: 'completion.locationCapacity',
                model: LocationCapacity
            })
            .execPopulate()
        responses.json(res)(populatedExecution)
    } catch (err) {
        responses.error(res)(err)
    }
}

exports.createExecution = async function (req, res) {
    const username = req.params[params.USERNAME_PARAM]
    const cardId = req.body.card

    const userExists = await User.exists({username: username})
    if (!userExists) {
        return responses.notFound(res)('User not found')
    }

    const cardExists = await TrainingCard.exists({_id: cardId})
    if (!cardExists) {
        return responses.badRequest(res)('Card not found')
    }

    const user = await User.findOne({username: username}).exec()
    const userId = user._id

    const executionExists = await TrainingExecution.exists({user: userId})
    if (executionExists) {
        return responses.conflict(res)
    }

    const exercises = await TrainingCard.findOne({_id: cardId})
        .populate({
            path: 'exercises.exercise',
            model: Exercise
        })
        .map(card => card.exercises)
        .exec();
    const exerciseLocationCapacityIds = await Promise.all(exercises.map(async exercise => {
        return await LocationCapacity.findOne({location: exercise.exercise.location})
            .map(doc => doc._id)
            .exec()
    }))
    const exerciseIds = exercises.map(exercise => exercise.exercise)

    const exerciseCompletions = exerciseIds.map((exerciseId, index) => {
        return {
            exercise: exerciseId,
            locationCapacity: exerciseLocationCapacityIds[index],
            completed: false
        }
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

const lock = new Semaphore(1)
exports.updateExecution = async function (req, res) {
    const username = req.params[params.USERNAME_PARAM]
    const command = req.body.command
    const exerciseIndex = req.body.exerciseIndex

    const userExists = await User.exists({username: username})
    if (!userExists) {
        return responses.notFound(res)('User not found')
    }

    const user = await User.findOne({username: username}).exec()
    const userId = user._id

    const foundExecution = await TrainingExecution.findOne({user: userId})
        .populate({
            path: 'completion.exercise',
            model: Exercise,
            populate: {
                path: 'location',
                model: Location
            }
        })
        .exec()
    if (!foundExecution) {
        return responses.notFound(res)('Execution not found')
    }

    if (!command) {
        return responses.badRequest(res)('command field is required')
    }
    if (exerciseIndex === undefined) {
        return responses.badRequest(res)('exerciseIndex field is required')
    }


    const release = await lock.acquire()
    const currentExercise = foundExecution.currentExercise;
    switch (command) {
        case 'startExercise':
            try {
                const completionLength = foundExecution.completion.length
                if (exerciseIndex >= completionLength || exerciseIndex < 0) {
                    release()
                    return responses.badRequest(res)('Exercise index out of bounds')
                }

                if (currentExercise !== null && exerciseIndex !== currentExercise && !foundExecution.completion[currentExercise].completed) {
                    const currentLocation = foundExecution.completion[currentExercise].exercise.location
                    const currentLocationCapacity = await LocationCapacity.findOne({location: currentLocation._id}).exec()
                    const currentLocationCapacityValue = currentLocationCapacity.capacity
                    currentLocationCapacity.capacity = currentLocationCapacityValue + 1
                    await currentLocationCapacity.save()
                }

                const location = foundExecution.completion[exerciseIndex].exercise.location
                const locationCapacity = await LocationCapacity.findOne({location: location._id}).exec()

                const currentCapacity = locationCapacity.capacity
                if (currentCapacity === 0) {
                    release()
                    return responses.badRequest(res)("Location is full")
                }

                locationCapacity.capacity = currentCapacity - 1
                await locationCapacity.save()

                foundExecution.currentExercise = exerciseIndex
                foundExecution.currentLocation = location
                await foundExecution.save()
                responses.noContent(res)
            } catch (err) {
                responses.error(res)(err)
            }
            break
        case 'completeExercise':
            try {
                foundExecution.completion[currentExercise].completed = true
                foundExecution.currentExercise = null
                foundExecution.currentLocation = null
                await foundExecution.save()

                const location = foundExecution.completion[exerciseIndex].exercise.location
                const locationCapacity = await LocationCapacity.findOne({location: location._id}).exec()
                const currentCapacity = locationCapacity.capacity
                if (currentCapacity < location.defaultCapacity) {
                    locationCapacity.capacity = currentCapacity + 1
                }
                await locationCapacity.save()

                const exercisesLength = foundExecution.completion.length;
                const completedExercisesLength = foundExecution.completion.filter(c => c.completed).length;
                if (completedExercisesLength === exercisesLength) {
                    const now = Date.now()
                    const statistics = await Statistics.findOne({ user: userId }).exec()
                    const currentExp = statistics.experiencePoints
                    const history = {
                        date: now,
                        completedAmount: completedExercisesLength,
                        workoutMinutes: Math.floor((now - foundExecution.startTime) / (1000 * 60)),
                        exercises: foundExecution.completion.map(obj => obj.exercise)
                    }
                    await TrainingExecution.deleteOne({user: userId}).exec()

                    statistics.experiencePoints = currentExp + (completedExercisesLength * 1)
                    statistics.executionHistory.push(history)
                    await statistics.save()

                    responses.json(res)({finished: true})
                } else {
                    responses.json(res)({finished: false})
                }
            } catch (err) {
                responses.error(res)(err)
            }
            break
    }
    release()
}

//TODO REMOVE WHEN CAPACITY IS FULL AND IF USER IS AWAY FOR LONG TIME
exports.removeExecution = async function (req, res) {
    const username = req.params[params.USERNAME_PARAM]

    const userExists = await User.exists({username: username})
    if (!userExists) {
        return responses.notFound(res)('User not found')
    }

    const user = await User.findOne({username: username}).exec()
    const userId = user._id

    const foundExecution = await TrainingExecution.findOne({user: userId}).exec()
    if (!foundExecution) {
        return responses.notFound(res)('Execution not found')
    }

    if (foundExecution.currentExercise !== null) { // if currentexercise == null (null lo metto io in completeExercise)
        const locationCapacity = await LocationCapacity.findOne({location: foundExecution.currentLocation})
            .populate({
                path: 'location',
                model: Location
            })
            .exec()
        const currentCapacity = locationCapacity.capacity
        if (currentCapacity < locationCapacity.location.defaultCapacity) {
            locationCapacity.capacity = currentCapacity + 1
        }
        await locationCapacity.save()
    }

    try {
        const completedExercisesLength = foundExecution.completion.filter(c => c.completed).length;

        if (completedExercisesLength > 0) {
            const now = Date.now()
            const statistics = await Statistics.findOne({ user: userId }).exec()
            const currentExp = statistics.experiencePoints
            const history = {
                date: now,
                completedAmount: completedExercisesLength,
                workoutMinutes: Math.floor((now - foundExecution.startTime) / (1000 * 60)),
                exercises: foundExecution.completion.filter(c => c.completed).map(obj => obj.exercise)
            }
            statistics.experiencePoints = currentExp + (completedExercisesLength * 1)
            statistics.executionHistory.push(history)
            await statistics.save()
        }

        await TrainingExecution.deleteOne({user: userId}).exec()

        responses.noContent(res)
    } catch (err) {
        responses.error(res)(err)
    }
}