const Location = require('../models/Location')
const responses = require('./util/responses')

const WITHOUT_ID = '-_id -__v'

exports.getAllLocations = async function(req, res) {
    const locations = await Location.find()
        .select(WITHOUT_ID)
        .exec()
    responses.json(res)(locations)
}

async function findLocation(location) {
    return Location.findOne({ description: location })
        .select(WITHOUT_ID)
        .exec()
}

exports.getLocation = async function(req, res) {
    const location = decodeURIComponent(req.params.location)
    console.log(location)
    const foundLocation = await findLocation(location)
    console.log(foundLocation)
    if (foundLocation) {
        responses.json(res)(foundLocation)
    } else {
        responses.notFound(res)
    }
}

exports.createLocation = async function(req, res) {
    const description = req.body.description

    const foundLocation = await findLocation(description)
    if (foundLocation) {
        responses.conflict(res)
    } else {
        try {
            const location = new Location({
                description: description
            })
            const createdLocation = await location.save();
            responses.created(res)(createdLocation)
        } catch (err) {
            responses.error(res)(err)
        }

    }
}

exports.updateLocationDescription = async function(req, res) {
    const location = req.params.location
    const description = req.body.description

    const foundLocation = await findLocation(location)
    if (foundLocation) {
        try {
            await Location.updateOne({ description: location }, { description: description }).exec()
            responses.noContent(res)
        } catch (err) {
            responses.error(res)(err)
        }
    } else {
        responses.notFound(res)
    }
}