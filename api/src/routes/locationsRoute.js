const locationsController = require("../controllers/locationsController")

const express = require('express')
const router = express.Router()
const authenticate = require('../middleware/auth')

router.get('/', locationsController.getAllLocations)

router.get('/:location', locationsController.getLocation)

router.post('/', /*authenticate,*/ locationsController.createLocation)

module.exports = router