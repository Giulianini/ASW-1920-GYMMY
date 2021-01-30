const mongoose = require('mongoose')

const ProgressThreshold = new mongoose.Schema({
    beginner: {
        type: Number,
        default: 0,
        required: true
    },
    intermediate: {
        type: Number,
        default: 100,
        required: true
    },
    advanced: {
        type: Number,
        default: 500,
        required: true
    }
})

module.exports = mongoose.model('ProgressThresholds', ProgressThreshold)