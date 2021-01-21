const mongoose = require('mongoose')
const ImageSchema = require('./Image')

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: ImageSchema,
        required: false
    },
    participants: [{
        type: String,
        required: true
    }]
})

module.exports = mongoose.model('Courses', CourseSchema)