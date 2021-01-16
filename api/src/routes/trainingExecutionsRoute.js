const trainingExecutionsController = require("../controllers/trainingExecutionsController")
const params = require('./params')

const express = require('express')
const router = express.Router({ mergeParams: true })
const authenticate = require('../middleware/auth')

router.get('/', trainingExecutionsController.getExecution)

router.put('/', trainingExecutionsController.createExecution)

router.patch('/', trainingExecutionsController.updateExecution)

module.exports = router