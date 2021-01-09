const locationsController = require("../controllers/locationsController")
const params = require('./params')

const express = require('express')
const router = express.Router()
const authenticate = require('../middleware/auth')

router.get('/', locationsController.getAllLocations)

router.get(`/:${params.LOCATION_PARAM}`, locationsController.getLocation)

router.post('/', /*authenticate,*/ locationsController.createLocation)

router.patch(`/:${params.LOCATION_PARAM}`, /*authenticate,*/ locationsController.updateLocationDescription)

module.exports = router