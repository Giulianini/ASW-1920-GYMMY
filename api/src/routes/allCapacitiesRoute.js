const allCapacitiesController = require("../controllers/allCapacitiesController")
const params = require('./params')

const express = require('express')
const router = express.Router({ mergeParams: true })
const auth = require('../middleware/auth')

router.get('/', allCapacitiesController.getAllCapacities)

module.exports = router