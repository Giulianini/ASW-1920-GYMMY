const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    objective: {
        type: new mongoose.Schema({
            description: {
                type: String,
                required: true
            },
            mainGoal: {
                type: String,
                required: true
            },
            targetWeight: {
                type: Number,
                required: true
            },
            targetBMI: {
                type: Number,
                required: true
            },
            targetCalories: {
                type: Number,
                required: true
            },
            targetMinWorkouts: {
                type: Number,
                required: true
            },
        })
    }
})

module.exports = mongoose.model('Users', UserSchema)