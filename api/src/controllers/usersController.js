const bcrypt = require('bcryptjs')
// "bcrypt": "^5.0.0",
const responses = require('./util/responses')

const User = require('../models/User')
const TrainingCard = require('../models/TrainingCard')
const Exercise = require('../models/Exercise')
const Location = require('../models/Location')

async function getUserId(username) {
    return User.findOne({ username: username }).map(doc => doc._id).exec()
}

exports.getAllUsers = async function(req, res) {
    try {
        const users = await User.find().select('-password -_id -__v').exec();
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json({ message: err })
    }
}

exports.createUser = async function (req, res) {
    const saltRounds = 12

    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    const age = req.body.age
    const height = req.body.height
    const weight = req.body.weight
    const userRole = "user"

    const usernameExists = await User.exists({ username: username })
    if (usernameExists) {
        responses.conflict(res)
    } else {
        bcrypt.hash(password, saltRounds, async (err, hash) => {
            const user = new User({
                username: username,
                email: email,
                password: hash,
                role: userRole,
                age: age,
                height: height,
                weight: weight
            })
            try {
                await user.save();
                responses.created(res)({
                    username: username,
                    email: email,
                    role: "user",
                    age: age,
                    height: height,
                    weight: weight
                })
            } catch (err) {
                responses.error(res)(err)
            }
        })

    }
}

async function findUser(username) {
    return User.findOne({ username: username })
        .select('-_id')
        .exec()
}

exports.getUser = async function(req, res) {
    const foundUser = await findUser(req.params.username)
    if (foundUser) {
        responses.json(res)(foundUser)
    } else {
        responses.notFound(res)
    }
}

exports.updateMeasures = async function(req, res) {
    const username = req.params.username
    const age = req.body.age
    const height = req.body.height
    const weight = req.body.weight

    const usernameExists = await User.exists({ username: username })
    if (!usernameExists) {
        responses.notFound(res)
    } else {
        await User.updateOne({ username: username}, { age: age, height: height, weight: weight}).exec()
        responses.noContent(res)
    }
}

exports.removeUser = async function(req, res) {
    const username = req.params.username
    const foundUser = await findUser(username)
    if (foundUser) {
        User.deleteOne({username: username})
            .exec()
            .then(() => {
                responses.noContent(res)
            })
    } else {
        responses.notFound(res)
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

exports.getUserObjective = async function(req, res) {
    const username = req.params.username

    const userExists = await User.exists({ username: username })
    if (!userExists) {
        return responses.notFound(res)
    }

    const foundUser = await User.findOne({ username: username, objective: { $exists: true, $ne: null }}).exec()
    if (!foundUser) {
        return responses.notFound(res)
    }

    const objective = foundUser.objective

    responses.json(res)(objective)
}

exports.createUserObjective = async function(req, res) {
    const username = req.params.username
    const objective = req.body.objective

    const userExists = await User.exists({ username: username })
    if (!userExists) {
        return responses.notFound(res)
    }

    const userObjectiveExists = await User.exists({ username: username, objective: { $exists: true, $ne: null }})
    console.log(userObjectiveExists)
    if (userObjectiveExists) {
        return responses.conflict(res)
    }

    try {
        await User.updateOne({ username: username }, { objective: objective }).exec()
        responses.created(res)(objective)
    } catch (err) {
        responses.error(res)(err)
    }
}

exports.updateUserObjective = async function(req, res) {
    const username = req.params.username
    const objective = req.body.objective

    const userExists = await User.exists({ username: username })
    if (!userExists) {
        return responses.notFound(res)
    }

    const userObjectiveExists = await User.exists({ username: username, objective: { $exists: true, $ne: null }})
    if (!userObjectiveExists) {
        return responses.notFound(res)
    }

    try {
        await User.updateOne({ username: username }, { objective: objective }).exec()
        responses.noContent(res)
    } catch (err) {
        responses.error(res)(err)
    }
}