const mongoose= require('mongoose')
const { LocationSchema } = require('Location');

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
    locations: [
        LocationSchema
    ]
})

module.exports = mongoose.model("Exercises", ExerciseSchema)