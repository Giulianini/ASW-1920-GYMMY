const Exercise = require('../models/Exercise')
const Location = require('../models/Location')
const responses = require('./util/responses')

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
            path: 'locations',
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
            path: 'locations',
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
        const locations = req.body.locations
        const locationIds = await getLocationIds(locations)
        if (locations.length !== locationIds.length) {
            responses.badRequest(res)('Some locations do not exist')
        } else {
            const exercise = new Exercise({
                name: name,
                description: description,
                locations: locationIds
            })
            const savedExercise = await exercise.save()
            const populatedExercise = await Exercise.findOne({_id: savedExercise._id})
                .populate({
                    path: 'locations',
                    model: Location
                })
                .exec()
            responses.created(res)(populatedExercise)
        }
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
        const locations = req.body.locations
        const locationIds = await getLocationIds(locations, res)

        if (locations.length !== locationIds.length) {
            responses.badRequest(res)('Some locations do not exist')
        } else {
            await Exercise.updateOne({name: exerciseName}, { locations: locationIds }).exec()
            responses.noContent(res)
        }
     } else {
        responses.notFound(res)('Exercise not found')
    }
}