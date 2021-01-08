const TrainingCard = require('../models/TrainingCard')
const responses = require('./util/responses')

const User = require('../models/User')

exports.createTrainingCard = async function(req, res) {
    const user = req.body.user
    const trainer = req.body.trainer
    const exercises = req.body.exercises

    const userExists = await User.exists({ username: user })
    if (!userExists) {
        return responses.badRequest(res)('User does not exist')
    } else {
        console.log('user exists')
    }

    const trainerExists = await User.exists({ username: trainer })
    if (!trainerExists) {
        return responses.badRequest(res)('Trainer does not exist')
    }

    console.log(exercises)

    res.sendStatus(200)
}