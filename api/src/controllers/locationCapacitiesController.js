const responses = require('./util/responses')
const params = require('../routes/params')

const Location = require('../models/Location')
const LocationCapacity = require('../models/LocationCapacity')

const { Semaphore } = require('await-semaphore');

const INCREMENT_CMD = '++'
const DECREMENT_CMD = '--'

exports.getLocationCapacity = async function(req, res) {
    const location = decodeURIComponent(req.params[params.LOCATION_PARAM])

    const foundLocation = await Location.findOne({ description: location }).exec()
    if (foundLocation) {
        try {
            const locationCapacity = await LocationCapacity.findOne({ location: foundLocation._id }).exec()
            responses.json(res)(locationCapacity)
        } catch (err) {
            responses.error(res)(err)
        }
    } else {
        responses.notFound(res)('Location not found')
    }
}

const lock = new Semaphore(1)
exports.updateLocationCapacity = async function(req, res) {
    const location = decodeURIComponent(req.params[params.LOCATION_PARAM])
    const command = req.body.command

    const locationExists = await Location.exists({ description: location })
    if (!locationExists) {
        return responses.notFound(res)('Location not found')
    }

    if (command !== INCREMENT_CMD && command !== DECREMENT_CMD) {
        return responses.badRequest(res)(`Bad command: use ${INCREMENT_CMD} or ${DECREMENT_CMD} instead`)
    }

    const foundLocation = await Location.findOne({ description: location })

    const release = await lock.acquire()

    try {
        const locationCapacity = await LocationCapacity.findOne({ location: foundLocation._id }).exec()

        const currentCapacity = locationCapacity.capacity
        if (currentCapacity === 0) {
            release()
            return responses.badRequest(res)("Location is full")
        }

        let newCapacity = currentCapacity;
        switch (command) {
            case INCREMENT_CMD:
                newCapacity++
                break
            case DECREMENT_CMD:
                newCapacity--
                break
        }

        locationCapacity.capacity = newCapacity
        await locationCapacity.save()

        responses.noContent(res)
    } catch (err) {
        release()
        return responses.error(res)(err)
    }

    release()
}