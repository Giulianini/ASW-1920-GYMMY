const mongoose = require('mongoose')

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

const ExercisesAmountSchema = new mongoose.Schema({
    month: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    exercises: {
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
    workoutMinutesByMonth: {
        type: [WorkoutMinutesSchema],
        required: true
    },
    exercisesByMonth: {
        type: [ExercisesAmountSchema],
        required: true
    }
})

module.exports = mongoose.model('Statistics', StatisticsSchema)