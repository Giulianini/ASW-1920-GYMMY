const Location = require('../models/Location')
const responses = require('./util/responses')

const WITHOUT_ID = '-_id -__v'

exports.getAllLocations = async (req, res) => {
    const locations = await Location.find()
        .select(WITHOUT_ID)
        .exec()
    responses.json(res)(locations)
}

async function findLocation(locationNumber) {
    return Location.findOne({ location: locationNumber })
        .select(WITHOUT_ID)
        .exec()
}

exports.getLocation = async (req, res) => {
    const locationNumber = req.params.location
    const foundLocation = await findLocation(locationNumber)
    if (foundLocation) {
        responses.json(res)(foundLocation)
    } else {
        responses.notFound(res)
    }
}

exports.createLocation = async function(req, res) {
    const id = req.body.location
    const description = req.body.description

    const foundLocation = await findLocation(id)
    if (foundLocation) {
        responses.conflict(res)
    } else {
        try {
            const location = new Location({
                location: id,
                description: description
            })
            const createdLocation = await location.save();
            responses.created(res)(createdLocation)
        } catch (err) {
            responses.error(res)(err)
        }

    }
}