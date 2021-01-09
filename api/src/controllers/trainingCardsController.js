const responses = require('./util/responses')

const User = require('../models/User')
const Exercise = require('../models/Exercise')
const TrainingCard = require('../models/TrainingCard')

async function getExerciseIds(exercises, res) {
    const exerciseDocs = await Exercise.find()
        .where('name')
        .in(exercises)
        .select('_id')
        .exec()
    return exerciseDocs.map(doc => doc._id)
}

exports.createTrainingCard = async function(req, res) {
    const user = req.body.user
    const trainer = req.body.trainer
    const exercises = req.body.exercises

    const userExists = await User.exists({ username: user })
    if (!userExists) {
        return responses.badRequest(res)('User does not exist')
    }

    const trainerExists = await User.exists({ username: trainer })
    if (!trainerExists) {
        return responses.badRequest(res)('Trainer does not exist')
    }

    const exerciseIds = await getExerciseIds(exercises.map(obj => obj.exercise))
    if (exerciseIds.length !== exercises.length) {
        return responses.badRequest(res)('Some exercises do not exist')
    }

    const userId = await User.findOne({ username: user }).map(doc => doc._id).exec();
    const trainerId = await User.findOne({ username: user }).map(doc => doc._id).exec();
    const exercisesWithIds = await Promise.all(exercises.map(async obj => {
        obj.exercise = await Exercise.findOne({ name: obj.exercise })
            .map(doc => doc._id)
            .exec()
        return obj
    }))

    const trainingCard = new TrainingCard({
        user: userId,
        trainer: trainerId,
        exercises: exercisesWithIds
    })

    try {
        const savedTrainingCard = await trainingCard.save()
        responses.created(res)(savedTrainingCard)
    } catch(err) {
        responses.error(res)(err)
    }
}