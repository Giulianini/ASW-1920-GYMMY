const mongoose = require('mongoose')

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

module.exports = ImageSchema