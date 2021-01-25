const allCapacitiesController = require("../controllers/allCapacitiesController")
const params = require('./params')

const express = require('express')
const router = express.Router({mergeParams: true})
const auth = require('../middleware/auth')

router.use(auth.authenticateJWT)

router.get('/',
    auth.authorizeUserAndTrainer,
    allCapacitiesController.getAllCapacities
)

module.exports = router