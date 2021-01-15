const mongoose= require('mongoose')

const ImageSchema = new mongoose.Schema({
    data: {
        type: Buffer,
        required: true
    },
    contentType: {
        type: String,
        required: true
    }
})

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
    locations: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Location'
    }]
})

module.exports = mongoose.model("Exercises", ExerciseSchema)