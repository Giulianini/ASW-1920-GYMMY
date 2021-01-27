const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const responses = require('./util/responses')

const secret = process.env.JWT_SECRET

exports.createSession = async function (req, res) {
    const {username, password} = req.body
    try {
        const foundUser = await User.findOne({username: username}).exec();
        if (foundUser) {
            bcrypt.compare(password, foundUser.password, (err, result) => {
                if (result) {
                    const accessToken = jwt.sign({
                        username: foundUser.username,
                        role: foundUser.role
                    }, secret)
                    responses.json(res)({username: foundUser.username, role: foundUser.role, accessToken})
                } else {
                    responses.unauthorized(res)
                }
            })
        } else {
            responses.unauthorized(res)
        }
    } catch (err) {
        responses.error(res)(err)
    }
}