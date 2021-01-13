const mongoose = require('mongoose')

const TrainingCardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    tags: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Tag',
    }],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    trainer: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    minutes: {
        type: Number,
        required: true
    },
    exercises: {
        type: [new mongoose.Schema({
            exercise: {
                type: mongoose.Schema.ObjectId,
                ref: 'Exercise',
                required: true
            },
            series: {
                type: Number,
                required: true
            },
            reps: {
                type: Number,
                required: true
            },
            rest: {
                type: new mongoose.Schema({
                    minutes: {
                        type: Number,
                        required: true
                    },
                    seconds: {
                        type: Number,
                        required: true
                    }
                }),
                required: true
            }
        })],
        required: true
    }
})

module.exports = mongoose.model('TrainingCards', TrainingCardSchema)