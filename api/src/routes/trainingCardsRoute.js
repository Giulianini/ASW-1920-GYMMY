const trainingCardsController = require("../controllers/trainingCardsController")
const params = require('./params')

const express = require('express')
const router = express.Router()
const authenticate = require('../middleware/auth')

router.post('/', trainingCardsController.createTrainingCard)

module.exports = router