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
        default: Date.now(),
        required: true
    },
    currentExercise: {
        type: mongoose.Schema.ObjectId,
        ref: 'Exercise',
        default: null,
        // required: true
    },
    completion: {
        type: [ExerciseCompletionSchema],
        required: true
    }
})

module.exports = mongoose.model('TrainingExecutions', TrainingExecutionSchema)