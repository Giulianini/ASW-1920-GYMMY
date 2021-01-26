const mongoose = require('mongoose')
const ImageSchema = require("./Image");

const ChallengeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    participants: [{
        type: String,
        required: true
    }],
    image: {
        type: ImageSchema,
        required: false
    },
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