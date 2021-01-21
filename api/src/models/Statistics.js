const mongoose = require('mongoose')

const ExecutionHistorySchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    completedAmount: {
        type: Number,
        required: true
    },
    workoutMinutes: {
        type: Number,
        required: true
    },
    exercises: [{
        type: mongoose.Schema.ObjectId,
        required: true
    }]
})

const WorkoutMinutesSchema = new mongoose.Schema({
    month: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    minutes: {
        type: Number,
        required: true
    }
})

const StatisticsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    experiencePoints: {
        type: Number,
        default: 0
    },
    executionHistory: {
        type: [ExecutionHistorySchema],
        required: true
    },
    workoutMinutesByMonth: {
        type: [WorkoutMinutesSchema],
        required: true
    }
})

module.exports = mongoose.model('Statistics', StatisticsSchema)