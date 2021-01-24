const responses = require('./util/responses')
const params = require('../routes/params')

const Location = require('../models/Location')
const LocationCapacity = require('../models/LocationCapacity')

exports.getAllCapacities = async function(req, res) {
    const capacities = await LocationCapacity.find()
        .populate({
            path: 'location',
            model: Location
        })
        .exec()
    responses.json(res)(capacities)
}