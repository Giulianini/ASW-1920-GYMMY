const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

const secret = process.env.JWT_SECRET

exports.createSession = async function (req, res) {
    const { username, password } = req.body
    try {
        const foundUser = await User.findOne({ username: username }).exec();
        if (foundUser) {
            bcrypt.compare(password, foundUser.password, (err, result) => {
                if (result) {
                    const accessToken = jwt.sign({
                        username: foundUser.username,
                        role: foundUser.role
                    }, secret)
                    res.status(200).json({ accessToken })
                } else {
                    res.sendStatus(401)
                }
            })
        } else {
            res.sendStatus(401)
        }
    } catch (err) {
        res.status(500).json({ message: err })
    }
}