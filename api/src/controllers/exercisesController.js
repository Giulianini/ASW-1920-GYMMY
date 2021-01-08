const Exercise = require('../models/Exercise')
const Location = require('../models/Location')
const responses = require('./util/responses')

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
        responses.notFound(res)
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
    const locations = req.body.locations
    try {
        const locationIds = await Promise.all(locations.map(async location => {
            try {
                return Location.findOne({location: location})
                    .select('_id')
                    .exec()
            } catch (err) {
                responses.error(res)(err)
            }
        }))
        const actualLocationIds = locationIds.map(location => location._id)

        const exercise = new Exercise({
            name: name,
            description: description,
            locations: actualLocationIds
        })
        const savedExercise = await exercise.save()
        const populatedExercise = await Exercise.findOne({_id: savedExercise._id})
            .populate({
                path: 'locations',
                model: Location
            })
            .exec()

        responses.created(res)(populatedExercise)
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
        responses.notFound(res)
    }
}