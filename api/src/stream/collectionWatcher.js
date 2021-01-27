const LocationCapacity = require('../models/LocationCapacity')
const TrainingExecution = require('../models/TrainingExecution')
const Location = require('../models/Location')
const Exercise = require('../models/Exercise')
const TrainingCard = require('../models/TrainingCard')
const User = require('../models/User')

async function handleExecutionInsert(data, io, userSockets, trainerSockets) {
    const executionId = data.documentKey._id
    const execution = await TrainingExecution.findById(executionId)
        .populate({
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
        .exec()

    const username = execution.user.username
    const card = execution.card.title
    const location = execution.currentLocation ? execution.currentLocation.description : 'N/A'

    trainerSockets.forEach((socketId, _) => {
        io.to(socketId).emit('executionInsert', {
            executionId: executionId,
            username: username,
            card: card,
            currentLocation: location
        })
    })
}

async function handleExecutionUpdate(data, io, userSockets, trainerSockets) {
    const executionId = data.documentKey._id
    const execution = await TrainingExecution.findById(executionId)
        .populate({
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
        .exec()

    const username = execution.user.username
    const card = execution.card.title
    const location = execution.currentLocation ? execution.currentLocation.description : 'N/A'

    trainerSockets.forEach((socketId, _) => {
        io.to(socketId).emit('executionUpdate', {
            executionId: executionId,
            username: username,
            card: card,
            currentLocation: location
        })
    })
}

async function handleExecutionDelete(data, io, userSockets, trainerSockets) {
    const executionId = data.documentKey._id
    trainerSockets.forEach((socketId, _) => {
        io.to(socketId).emit('executionDelete', {
            executionId: executionId
        })
    })
}

exports.watch = function (mongoose, io, userSockets, trainerSockets) {
    LocationCapacity.watch().on('change', async data => {
        const locationCapacityId = data.documentKey._id

        const location = await LocationCapacity.findById(locationCapacityId)
            .populate({
                path: 'location',
                model: Location
            })
            .map(doc => doc.location)
            .exec()

        const usernames = [...userSockets.keys()]
        const userIds = await Promise.all(usernames.map(async username => {
            return User.findOne({username: username}).map(doc => doc._id).exec()
        }))
        const userExecutions = await TrainingExecution.find({user: {$in: userIds}})
            .populate({
                path: 'user',
                select: '-password',
                model: User
            })
            .populate({
                path: 'completion.exercise',
                model: Exercise
            })
            .populate({
                path: 'completion.locationCapacity',
                model: LocationCapacity
            })
            .exec()
        const usernameCapacities = userExecutions
            .filter(execution => {
                const completion = execution.completion
                const exercises = completion.map(obj => obj.exercise) //.filter(obj => !obj.completed) REMOVED
                const targetExercises = exercises.filter(exercise => {
                    return exercise.location.toString() === location._id.toString()
                })
                return targetExercises.length > 0
            })
            .map(execution => {
                return {
                    username: execution.user.username,
                    capacities: execution.completion.map(completion => completion.locationCapacity.capacity)
                }
            })
        usernameCapacities.forEach(obj => {
            io.to(userSockets.get(obj.username)).emit('capacities', obj.capacities)
        })
    })

    LocationCapacity.watch().on('change', async data => {
        const locationCapacityId = data.documentKey._id
        const locationCapacity = await LocationCapacity.findById(locationCapacityId)
            .populate({
                path: 'location',
                model: Location
            })
            .exec()

        const locationName = locationCapacity.location.description
        const locationCapacityValue = locationCapacity.capacity

        trainerSockets.forEach((socketId, username) => {
            io.to(socketId).emit('capacityUpdate', {
                location: locationName,
                capacity: locationCapacityValue
            })
        })
    })

    TrainingExecution.watch().on('change', async data => {
        switch (data.operationType) {
            case "insert":
                await handleExecutionInsert(data, io, userSockets, trainerSockets)
                break
            case "update":
                await handleExecutionUpdate(data, io, userSockets, trainerSockets)
                break
            case "delete":
                await handleExecutionDelete(data, io, userSockets, trainerSockets)
                break
            case "dropDatabase":
                console.log('ehmmmm')
                break
        }
    })
}