const responses = require('./util/responses')

const User = require('../models/User')
const Exercise = require('../models/Exercise')
const TrainingCard = require('../models/TrainingCard')
const Location = require('../models/Location')
const Tag = require('../models/Tag')

async function getExerciseIds(exercises, res) {
    const exerciseDocs = await Exercise.find()
        .where('name').in(exercises)
        .select('_id')
        .exec()
    return exerciseDocs.map(doc => doc._id)
}

async function getTagIds(tags, res) {
    const tagDocs = await Tag.find()
        .where('name')
        .in(tags)
        .select('_id')
        .exec()
    console.log("tagDocs " + tagDocs)
    return tagDocs.map(doc => doc._id)
}

async function getUserId(username) {
    return User.findOne({ username: username }).map(doc => doc._id).exec()
}

exports.createTrainingCard = async function(req, res) {
    const user = req.params.username

    const title = req.body.title
    const trainer = req.body.trainer
    const exercises = req.body.exercises
    const tags = req.body.tags ? req.body.tags : []
    const tagSet = [...new Set(tags.map(tag => tag.name))]

    const userExists = await User.exists({ username: user })
    if (!userExists) {
        return responses.notFound(res)
    }

    const trainerExists = await User.exists({ username: trainer })
    if (!trainerExists) {
        return responses.badRequest(res)('Trainer does not exist')
    }

    const exerciseIds = await getExerciseIds(exercises.map(obj => obj.exercise))
    if (exerciseIds.length !== exercises.length) {
        return responses.badRequest(res)('Some exercises do not exist')
    }

    const tagIds = await getTagIds(tagSet)
    if (tagIds.length !== tagSet.length) {
        return responses.badRequest(res)('Some tags do not exist')
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
        title: title,
        user: userId,
        trainer: trainerId,
        exercises: exercisesWithIds
    })

    if (tagSet) {
        trainingCard.tags = await Promise.all(tagSet.map(async tagName => {
            return await Tag.findOne({name: tagName})
                .map(doc => doc._id)
                .exec()
        }))
    }

    try {
        const savedTrainingCard = await trainingCard.save()
        responses.created(res)(savedTrainingCard)
    } catch(err) {
        responses.error(res)(err)
    }
}

exports.getUserCard = async function (req, res){
    const username = req.params.username
    const cardIndex = req.params.cardIndex

    const usernameExists = await User.exists({ username: username })
    if (!usernameExists) {
        return responses.notFound(res)
    }

    if (cardIndex < 0) {
        return responses.badRequest(res)("Invalid card index")
    }

    const userId = await getUserId(username)
    const userCards = await TrainingCard.find({ user: userId }).exec()

    const userCardsAmount = userCards.length
    if (cardIndex >= userCardsAmount) {
        return responses.notFound(res)
    }

    responses.json(res)(userCards[cardIndex])
}

exports.getUserCards = async function(req, res) {
    const username = req.params.username

    const usernameExists = await User.exists({ username: username })
    if (usernameExists) {
        const userId = await getUserId(username)
        const userCards = await TrainingCard.find({ user: userId })
            .populate({
                path: 'tags',
                model: Tag
            })
            .populate({
                path: 'user',
                model: User,
                select: '-password'
            })
            .populate({
                path: 'trainer',
                model: User,
                select: '-password'
            })
            .populate({
                path: 'exercises.exercise',
                model: Exercise,
                populate: {
                    path: 'locations',
                    model: Location
                }
            })
            .exec()
        responses.json(res)(userCards)
    } else {
        responses.notFound(res)
    }
}