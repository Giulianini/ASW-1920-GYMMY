const mongoose = require('mongoose')

const LocationSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    defaultCapacity: {
        type: Number,
        required: true
    }
})

const Location = mongoose.model('Locations', LocationSchema)

module.exports = Location