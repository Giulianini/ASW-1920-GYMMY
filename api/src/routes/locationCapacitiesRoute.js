const locationCapacitiesController = require("../controllers/locationCapacitiesController")
const params = require('./params')

const express = require('express')
const router = express.Router({ mergeParams: true })
const authenticate = require('../middleware/auth')

router.get('/', locationCapacitiesController.getLocationCapacity)

module.exports = router