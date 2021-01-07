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
                role: userRole
            })
            try {
                await user.save();
                res.status(201).json({
                    username: username,
                    email: email,
                    role: "user"
                })
            } catch (err) {
                res.status(500).json({ message: err })
            }
        })

    }
}

exports.getUser = async function(req, res) {
    const username = req.params.username
    const foundUser = await User.findOne({ username: username })
        .select('-_id username email role')
        .exec()
    if (foundUser) {
        responses.json(res)(foundUser)
    } else {
        responses.notFound(res)
    }
}