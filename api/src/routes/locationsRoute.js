const locationsController = require("../controllers/locationsController")
const params = require('./params')

const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

router.use(auth.authenticateJWT)

router.get('/',
    auth.authorizeUserAndTrainer,
    locationsController.getAllLocations
)

router.get(`/:${params.LOCATION_PARAM}`,
    auth.authorizeUserAndTrainer,
    locationsController.getLocation
)

router.post('/',
    auth.authorizeTrainer,
    locationsController.createLocation
)

router.patch(`/:${params.LOCATION_PARAM}`,
    auth.authorizeTrainer,
    locationsController.updateLocationDescription
)

module.exports = router