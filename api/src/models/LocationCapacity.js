const mongoose = require('mongoose')

const LocationCapacitySchema = new mongoose.Schema({
    location: {
        type: mongoose.Schema.ObjectId,
        ref: 'Location',
        required: true
    },
    capacity: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("LocationCapacities", LocationCapacitySchema)