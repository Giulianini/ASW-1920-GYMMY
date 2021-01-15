const Exercise = require('../models/Exercise')
const Location = require('../models/Location')
const responses = require('./util/responses')
const params = require('../routes/params')
const fs = require("fs");

async function getLocationIds(descriptions, res) {
    const locationDocs = await Location.find()
        .where('description')
        .in(descriptions)
        .select('_id')
        .exec()
    return locationDocs.map(doc => doc._id)
}

exports.getExercise = async function(req, res) {
    const exerciseName = req.params.exerciseName
    const foundExercise = await Exercise.findOne({ name: exerciseName })
        .populate({
            path: 'location',
            model: Location
        })
        .exec()
    if (foundExercise) {
        responses.json(res)(foundExercise)
    } else {
        responses.notFound(res)('Exercise not found')
    }
}

exports.getAllExercises = async function(req, res) {
    const foundExercises = await Exercise.find()
        .populate({
            path: 'location',
            model: Location
        }).exec()
    responses.json(res)(foundExercises)
}

exports.createExercise = async function(req, res) {
    const name = req.body.name
    const description = req.body.description

    const exerciseExists = await Exercise.exists({ name: name })
    if (exerciseExists) {
        return responses.conflict(res)
    }

    try {
        const location = req.body.location
        const foundLocation = await Location.findOne({ description: location}).exec()
        if (!foundLocation) {
            responses.badRequest(res)('Location does not exist')
        } else {
            const exercise = new Exercise({
                name: name,
                description: description,
                location: foundLocation._id
            })
            const savedExercise = await exercise.save()
            const populatedExercise = await Exercise.findOne({_id: savedExercise._id})
                .populate({
                    path: 'location',
                    model: Location
                })
                .exec()
            responses.created(res)(populatedExercise)
        }
    } catch (err) {
        responses.error(res)(err)
    }
}

exports.getExerciseImage = async function(req, res) {
    const exercise = req.params[params.EXERCISE_NAME_PARAM]

    const foundExercise = await Exercise.findOne({ name: exercise }).exec()
    if (!foundExercise) {
        return responses.notFound(res)('Exercise not found')
    }

    const foundImage = foundExercise.image
    if (!foundImage) {
        return responses.notFound(res)('Exercise image not found')
    }

    res.contentType(foundImage.contentType).send(foundImage.data)
}

exports.createExerciseImage = async function(req, res) {
    const exercise = req.params[params.EXERCISE_NAME_PARAM]

    const foundExercise = await Exercise.findOne({ name: exercise }).exec()
    if (!foundExercise) {
        return responses.notFound(res)('Exercise not found')
    }

    try {
        const img = req.file.buffer
        const contentType = req.file.mimetype
        foundExercise.image = {
            data: img,
            contentType: contentType
        }
        await foundExercise.save()
        responses.noContent(res)
    } catch (err) {
        responses.error(res)(err)
    }
}

exports.removeExerciseImage = async function(req, res) {
    const exercise = req.params[params.EXERCISE_NAME_PARAM]

    const foundExercise = await Exercise.findOne({ name: exercise }).exec()
    if (!foundExercise) {
        return responses.notFound(res)('Exercise not found')
    }

    const foundImage = foundExercise.image
    if (!foundImage) {
        return responses.notFound(res)('Exercise image not found')
    }

    try {
        foundExercise.image = undefined
        await foundExercise.save()
        responses.noContent(res)
    } catch (err) {
        responses.error(res)(err)
    }
}

exports.removeExercise = async function(req, res) {
    const exerciseName = req.params.exerciseName
    const foundExercise = await Exercise.findOne({ name: exerciseName }).exec()
    if (foundExercise) {
        Exercise.deleteOne({ name: exerciseName })
            .exec()
            .then(() => {
                responses.noContent(res)
            })
    } else {
        responses.notFound(res)('Exercise not found')
    }
}

exports.updateExerciseLocations = async function(req, res) {
    const exerciseName = req.params.exerciseName
    const foundExercise = await Exercise.findOne({ name: exerciseName }).exec()
    if (foundExercise) {
        const location = req.body.location
        const foundLocation = await Location.findOne({ description: location})
        if (!foundLocation) {
            responses.badRequest(res)('Location does not exist')
        } else {
            await Exercise.updateOne({name: exerciseName}, { locations: locationIds }).exec()
            responses.noContent(res)
        }
     } else {
        responses.notFound(res)('Exercise not found')
    }
}