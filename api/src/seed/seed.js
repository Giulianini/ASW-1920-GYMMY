const bcrypt = require('bcryptjs')
const User = require('../models/User')
const ProgressThreshold = require('../models/ProgressThreshold')
const Statistics = require("../models/Statistics");

function log(msg) {
    console.log('[SEED] ' + msg)
}

async function createTrainer(username, password, email) {
    log(`Creating trainer '${username}'`)
    await createUser(username, password, email, 'trainer')
}

async function createGymUser(username, password, email) {
    log(`Creating user '${username}'`)
    await createUser(username, password, email, 'user')
}

async function createUserStatistics(username) {
    log(`Creating '${username}' statistics`)
    const foundUser = await User.findOne({ username: username }).exec()
    if (foundUser) {
        const statistics = new Statistics({
            user: foundUser._id,
            workoutMinutesByMonth: [
                {
                    month: 11,
                    year: 2020,
                    minutes: 50
                },
                {
                    month: 0,
                    year: 2021,
                    minutes: 70
                },
                {
                    month: 1,
                    year: 2021,
                    minutes: 10
                },
            ],
            exercisesByMonth: [
                {
                    month: 11,
                    year: 2020,
                    exercises: 30
                },
                {
                    month: 0,
                    year: 2021,
                    exercises: 25
                },
                {
                    month: 1,
                    year: 2021,
                    exercises: 5
                }
            ]
        })
        await statistics.save()
    } else {
        log(`Could not find user ${username} - statistics seeding aborted`)
    }
}

async function createUser(username, password, email, role) {
    const userExists = await User.exists({ username: username })
    if (!userExists) {
        const saltRounds = 12
        bcrypt.hash(password, saltRounds, async (err, hash) => {
            const user = new User({
                username: username,
                email: email,
                password: hash,
                role: role
            })
            await user.save()
            await createUserStatistics(username)
        })
    }
}

async function createProgressThreshold() {
    log('Creating progress threshold')
    const thresholdExists = await ProgressThreshold.findOne().exec()
    if (!thresholdExists) {
        const threshold = new ProgressThreshold({
            beginner: 0,
            intermediate: 100,
            advanced: 500
        })
        await threshold.save()
    }
}

exports.seed = async function() {
    log('Seeding initiated')

    await createGymUser('user', 'user', 'user@gymmy.com')
    await createTrainer('trainer', 'trainer', 'trainer@gymmy.com')
    await createProgressThreshold()
}