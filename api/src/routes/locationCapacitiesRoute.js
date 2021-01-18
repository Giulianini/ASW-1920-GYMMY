const locationCapacitiesController = require("../controllers/locationCapacitiesController")
const params = require('./params')

const express = require('express')
const router = express.Router({ mergeParams: true })
const auth = require('../middleware/auth')

router.get('/', locationCapacitiesController.getLocationCapacity)

router.patch('/', locationCapacitiesController.updateLocationCapacity)

module.exports = router