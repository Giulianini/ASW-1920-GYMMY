const responses = require('./util/responses')
const params = require('../routes/params')

const ProgressThreshold = require('../models/ProgressThreshold')

exports.getThreshold = async function (req, res) {
    const threshold = await ProgressThreshold.findOne().exec()

    if (!threshold) {
        return responses.notFound(res)('Threshold not found')
    }

    responses.json(res)(threshold)
}

exports.createThreshold = async function (req, res) {
    const beginner = req.body.beginner
    const intermediate = req.body.intermediate
    const advanced = req.body.advanced

    if (beginner === undefined || intermediate === undefined || advanced === undefined) {
        return responses.badRequest(res)('Please specify all thresholds')
    }

    const thresholdExists = await ProgressThreshold.exists({})
    if (thresholdExists) {
        return responses.conflict(res)
    }

    try {
        const threshold = new ProgressThreshold({
            beginner: beginner,
            intermediate: intermediate,
            advanced: advanced
        })
        await threshold.save()
        responses.created(res)(threshold)
    } catch (err) {
        responses.error(res)(err)
    }
}

exports.modifyThreshold = async function (req, res) {
    const beginner = req.body.beginner
    const intermediate = req.body.intermediate
    const advanced = req.body.advanced

    const foundThreshold = await ProgressThreshold.findOne().exec()
    if (!foundThreshold) {
        return responses.conflict(res)
    }

    if (beginner !== undefined) {
        foundThreshold.beginner = beginner
    }
    if (intermediate !== undefined) {
        foundThreshold.intermediate = intermediate
    }
    if (advanced !== undefined) {
        foundThreshold.advanced = advanced
    }

    await foundThreshold.save()
    responses.noContent(res)
}