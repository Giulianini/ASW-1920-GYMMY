const mongoose= require('mongoose')

const ExerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: Buffer,
        contentType: String,
        required: false
    },
    description: {
        type: String,
        required: true
    },
    locations: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Location'
    }]
})

module.exports = mongoose.model("Exercises", ExerciseSchema)