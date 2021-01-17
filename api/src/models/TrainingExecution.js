const mongoose = require('mongoose')

const ExerciseCompletionSchema = new mongoose.Schema({
    exercise: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    completed: {
        type: Boolean,
        default: false,
        required: true,
    }
})

const TrainingExecutionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    card: {
        type: mongoose.Schema.ObjectId,
        ref: 'TrainingCard',
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    currentExercise: {
        type: Number,
        default: null,
        // required: true
    },
    currentLocation: {
        type: mongoose.Schema.ObjectId,
        ref: 'Location',
        default: null,
    },
    completion: {
        type: [ExerciseCompletionSchema],
        required: true
    }
})

module.exports = mongoose.model('TrainingExecutions', TrainingExecutionSchema)