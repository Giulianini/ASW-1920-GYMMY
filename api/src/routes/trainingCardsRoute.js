const trainingCardsController = require("../controllers/trainingCardsController")
const params = require('./params')

const express = require('express')
const router = express.Router({mergeParams: true})
const auth = require('../middleware/auth')

router.use(auth.authenticateJWT)

router.get(`/`,
    auth.authorizeUserAndTrainer,
    auth.ensureUserOwnsInfo,
    trainingCardsController.getUserCards
)

router.get(`/:${params.CARD_INDEX_PARAM}`,
    auth.authorizeUserAndTrainer,
    auth.ensureUserOwnsInfo,
    trainingCardsController.getUserCard
)

router.post(`/`,
    auth.authorizeTrainer,
    trainingCardsController.createTrainingCard
)

module.exports = router