const Location = require('../models/Location')
const responses = require('./util/responses')

async function findLocation(locationNumber) {
    return Location.findOne({ location: locationNumber })
        .select('-_id')
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