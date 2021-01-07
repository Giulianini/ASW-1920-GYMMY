const Exercise = require('../models/Exercise')
const Location = require('../models/Location')
const responses = require('./util/responses')

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
                res.status(500).json({ message: err })
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

        // res.status(201).json(populatedExercise)
        responses.created(res)(populatedExercise)
    } catch (err) {
        res.status(500).json({ message: err })
    }
}