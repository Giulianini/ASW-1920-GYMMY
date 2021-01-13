const responses = require('./util/responses')
const params = require('../routes/params')

const Location = require('../models/Location')
const LocationCapacity = require('../models/LocationCapacity')

exports.getLocationCapacity = async function(req, res) {
    const location = decodeURIComponent(req.params[params.LOCATION_PARAM])

    const foundLocation = await Location.findOne({ description: location }).exec()
    if (foundLocation) {
        try {
            const locationCapacity = await LocationCapacity.findOne({ location: foundLocation._id }).exec()
            responses.json(res)(locationCapacity)
        } catch (err) {
            responses.error(res)(err)
        }
    } else {
        responses.notFound(res)
    }
}