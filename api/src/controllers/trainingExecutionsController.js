const params = require('../routes/params')
const responses = require('./util/responses')

const User = require('../models/User')
const TrainingCard = require('../models/TrainingCard')
const TrainingExecution = require('../models/TrainingExecution')

exports.createExecution = async function(req, res) {
    const username = req.params[params.USERNAME_PARAM]
    const cardId = req.body.card

    const userExists = await User.exists({ username: username })
    if (!userExists) {
        return responses.notFound(res)('User not found')
    }

    const cardExists = TrainingCard.exists({ _id: cardId })
    if (!cardExists) {
        return responses.notFound(res)('Card not found')
    }

    const user = await User.findOne({ username: username }).exec()
    const userId = user._id

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