const locationCapacitiesController = require("../controllers/locationCapacitiesController")
const params = require('./params')

const express = require('express')
const router = express.Router({mergeParams: true})
const auth = require('../middleware/auth')

router.use(auth.authenticateJWT)

router.get('/',
    auth.authorizeUserAndTrainer,
    locationCapacitiesController.getLocationCapacity
)

router.patch('/',
    auth.authorizeUserAndTrainer,
    locationCapacitiesController.updateLocationCapacity
)

module.exports = router