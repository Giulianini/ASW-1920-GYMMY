const params = require('../routes/params')
const responses = require('./util/responses')

const User = require('../models/User')
const Statistics = require('../models/Statistics')
const Exercise = require('../models/Exercise')

exports.getUserStatistics = async function (req, res) {
    const username = req.params[params.USERNAME_PARAM]

    const foundUser = await User.findOne({username: username}).exec()
    if (!foundUser) {
        return responses.notFound(res)('User not found')
    }

    try {
        const statistics = await Statistics.findOne({user: foundUser._id}).exec()
        responses.json(res)(statistics)
    } catch (err) {
        responses.error(res)(err)
    }
}