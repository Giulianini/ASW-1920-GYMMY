const statisticsController = require("../controllers/statisticsController")
const params = require('./params')

const express = require('express')
const router = express.Router({mergeParams: true})
const auth = require('../middleware/auth')

router.get('/',
    auth.authenticateJWT,
    auth.authorizeUserAndTrainer,
    auth.ensureUserOwnsInfo,
    statisticsController.getUserStatistics
)

module.exports = router
