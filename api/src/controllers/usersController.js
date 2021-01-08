const User = require('../models/User')
const bcrypt = require('bcryptjs')
// "bcrypt": "^5.0.0",
const responses = require('./util/responses')

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
        .select('-_id username email role')
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