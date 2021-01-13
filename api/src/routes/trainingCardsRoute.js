const trainingCardsController = require("../controllers/trainingCardsController")
const params = require('./params')

const express = require('express')
const router = express.Router({ mergeParams: true })
const authenticate = require('../middleware/auth')

router.get(`/`, trainingCardsController.getUserCards)

router.get(`/:${params.CARD_INDEX_PARAM}`, trainingCardsController.getUserCard)

router.post(`/`, trainingCardsController.createTrainingCard)

module.exports = router