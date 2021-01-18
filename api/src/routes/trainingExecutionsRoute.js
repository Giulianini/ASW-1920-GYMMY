const trainingExecutionsController = require("../controllers/trainingExecutionsController")
const params = require('./params')

const express = require('express')
const router = express.Router({ mergeParams: true })
const auth = require('../middleware/auth')

router.get('/', auth.authenticateJWT, trainingExecutionsController.getExecution)

router.put('/', auth.authenticateJWT, trainingExecutionsController.createExecution)

router.patch('/', auth.authenticateJWT, trainingExecutionsController.updateExecution)

router.delete('/', auth.authenticateJWT, trainingExecutionsController.removeExecution)

module.exports = router