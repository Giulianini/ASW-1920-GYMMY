const params = require('../routes/params')
const responses = require('./util/responses')

const User = require('../models/User')
const TrainingCard = require('../models/TrainingCard')
const TrainingExecution = require('../models/TrainingExecution')
const Exercise = require('../models/Exercise')
const Location = require('../models/Location')
const LocationCapacity = require('../models/LocationCapacity')
const Statistics = require('../models/Statistics')

exports.getAllExecutions = async function (req, res) {
    const executions = await TrainingExecution.find()
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
    responses.json(res)(executions)
}