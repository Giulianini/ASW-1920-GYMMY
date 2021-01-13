const LocationCapacity = require('../models/LocationCapacity')

exports.watch = function(mongoose, io) {
    LocationCapacity.watch().on('change', data => console.log(data))
}