const bcrypt = require('bcryptjs')
const User = require('../models/User')
const ProgressThreshold = require('../models/ProgressThreshold')

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

    log('Seeding completed')
}