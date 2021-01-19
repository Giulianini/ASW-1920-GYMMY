const params = require('../routes/params')
const responses = require('./util/responses')

const User = require('../models/User')
const Challenge = require('../models/Challenge')
const Statistics = require('../models/Statistics')

exports.getChallenges = async function(req, res) {
    const challenges = await Challenge.find()
        .populate({
            path: 'participants',
            model: User
        })
        .exec()
    responses.json(res)(challenges)
}

exports.createChallenge = async function(req, res) {
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

exports.enrollInChallenge = async function(req, res) {
    const challengeId = req.params[params.CHALLENGE_ID_PARAM]
    const command = req.body.command
    const username = req.body.username

    if (!command) {
        return responses.badRequest(res)('Specify a command')
    }
    if (!username) {
        return responses.badRequest(res)('Specify a username')
    }

    const foundChallenge = await Challenge.findById(challengeId).exec()
    if (!foundChallenge) {
        return responses.notFound(res)('Challenge not found')
    }

    if (foundChallenge.participants.includes(username)) {
        return responses.badRequest(res)('User is already enrolled')
    }

    try {
        switch (command) {
            case 'enroll':
                foundChallenge.participants.push(username)
                await foundChallenge.save()
                break
        }
        responses.noContent(res)
    } catch (err) {
        responses.error(res)(err)
    }
}

async function assignReward(username, challenge) {
    if (username) {
        const reward = challenge.expRewards.firstPlace
        const userId = await User.findOne({ username: username }).map(doc => doc._id).exec()
        const statistics = await Statistics.findOne({ user: userId }).exec()
        const currentExp = statistics.experiencePoints
        statistics.experiencePoints = currentExp + reward
        await statistics.save()
    }
}

exports.closeChallenge = async function(req, res) {
    const challengeId = req.params[params.CHALLENGE_ID_PARAM]
    const firstPlace = req.body.firstPlace
    const secondPlace = req.body.secondPlace
    const thirdPlace = req.body.thirdPlace

    if (!challengeId) {
        return responses.badRequest(res)('Specify a challenge id')
    }

    const foundChallenge = await Challenge.findById(challengeId).exec()
    if (!foundChallenge) {
        return responses.notFound(res)('Challenge not found')
    }

    try {
        await assignReward(firstPlace, foundChallenge)
        await assignReward(secondPlace, foundChallenge)
        await assignReward(thirdPlace, foundChallenge)

        await Challenge.deleteOne({ _id: challengeId }).exec()
        responses.noContent(res)
    } catch (err) {
        responses.error(res)(err)
    }
}