const mongoose = require('mongoose')

const ChallengeSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    participants: [{
        type: String,
        required: true
    }],
    expRewards: {
        type: new mongoose.Schema({
            firstPlace: {
                type: Number,
                required: true
            },
            secondPlace: {
                type: Number,
                required: true
            },
            thirdPlace: {
                type: Number,
                required: true
            }
        }),
        required: true
    }
})

module.exports = mongoose.model('Challenges', ChallengeSchema)