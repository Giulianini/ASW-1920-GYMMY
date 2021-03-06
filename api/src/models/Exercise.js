const mongoose= require('mongoose')
const ImageSchema = require('./Image')

const ExerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: ImageSchema,
        required: false
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: mongoose.Schema.ObjectId,
        ref: 'Location'
    }
})

module.exports = mongoose.model("Exercises", ExerciseSchema)