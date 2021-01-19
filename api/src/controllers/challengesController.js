const params = require('../routes/params')
const responses = require('./util/responses')

const User = require('../models/User')
const Challenge = require('../models/Challenge')

exports.getChallenges = async function (req, res) {
    const challenges = await Challenge.find()
        .populate({
            path: 'participants',
            model: User
        })
        .exec()
    responses.json(res)(challenges)
}

exports.createChallenge = async function (req, res) {
    const description = req.body.description
    const firstPlaceReward = req.body.firstPlaceReward
    const secondPlaceReward = req.body.secondPlaceReward
    const thirdPlaceReward = req.body.thirdPlaceReward

    if (!(description && firstPlaceReward && secondPlaceReward && thirdPlaceReward)) {
        return responses.badRequest(res)('Specify challenge description and rewards')
    }

    try {
        const challenge = new Challenge({
            description: description,
            expRewards: {
                firstPlace: firstPlaceReward,
                secondPlace: secondPlaceReward,
                thirdPlace: thirdPlaceReward
            }
        })
        await challenge.save()
        responses.created(res)(challenge)
    } catch (err) {
        responses.error(res)(err)
    }
}