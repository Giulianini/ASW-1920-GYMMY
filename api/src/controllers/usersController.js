const bcrypt = require('bcryptjs')
// "bcrypt": "^5.0.0",
const responses = require('./util/responses')

const User = require('../models/User')

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
            })
            try {
                await user.save();
                responses.created(res)({
                    username: username,
                    email: email,
                    role: "user",
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
        responses.notFound(res)('User not found')
    }
}

exports.updateMeasures = async function(req, res) {
    const username = req.params.username
    const age = req.body.age
    const height = req.body.height
    const weight = req.body.weight

    const usernameExists = await User.exists({ username: username })
    if (!usernameExists) {
        responses.notFound(res)('User not found')
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
        responses.notFound(res)('User not found')
    }
}

exports.getUserObjective = async function(req, res) {
    const username = req.params.username

    const userExists = await User.exists({ username: username })
    if (!userExists) {
        return responses.notFound(res)('User not found')
    }

    const foundUser = await User.findOne({ username: username, objective: { $exists: true, $ne: null }}).exec()
    if (!foundUser) {
        return responses.notFound(res)('User not found')
    }

    const objective = foundUser.objective

    responses.json(res)(objective)
}

exports.createUserObjective = async function(req, res) {
    const username = req.params.username
    const description = req.body.description
    const mainGoal = req.body.mainGoal
    const targetWeight = req.body.targetWeight
    const targetBMI = req.body.targetBMI
    const targetCalories = req.body.targetCalories
    const targetMinWorkouts = req.body.targetMinWorkouts

    const userExists = await User.exists({ username: username })
    if (!userExists) {
        return responses.notFound(res)('User not found')
    }

    const userObjectiveExists = await User.exists({ username: username, objective: { $exists: true, $ne: null }})
    console.log(userObjectiveExists)
    if (userObjectiveExists) {
        return responses.conflict(res)
    }

    try {
        const objective = {
            description: description,
            mainGoal: mainGoal,
            targetWeight: targetWeight,
            targetBMI: targetBMI,
            targetCalories: targetCalories,
            targetMinWorkouts: targetMinWorkouts,
        }
        const user = await User.findOne({ username: username }).exec()
        user.objective = objective
        await user.save()
        responses.created(res)(objective)
    } catch (err) {
        responses.error(res)(err)
    }
}

exports.updateUserObjective = async function(req, res) {
    const username = req.params.username
    // const objective = req.body.objective
    const description = req.body.description
    const mainGoal = req.body.mainGoal
    const targetWeight = req.body.targetWeight
    const targetBMI = req.body.targetBMI
    const targetCalories = req.body.targetCalories
    const targetMinWorkouts = req.body.targetMinWorkouts

    const userExists = await User.exists({ username: username })
    if (!userExists) {
        return responses.notFound(res)('User not found')
    }

    const userObjectiveExists = await User.exists({ username: username, objective: { $exists: true, $ne: null }})
    if (!userObjectiveExists) {
        return responses.notFound(res)('User objective not found')
    }

    try {
        const objective = {
            description: description,
            mainGoal: mainGoal,
            targetWeight: targetWeight,
            targetBMI: targetBMI,
            targetCalories: targetCalories,
            targetMinWorkouts: targetMinWorkouts,
        }
        await User.updateOne({ username: username }, { objective: objective }).exec()
        responses.noContent(res)
    } catch (err) {
        responses.error(res)(err)
    }
}