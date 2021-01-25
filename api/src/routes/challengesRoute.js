const challengesController = require("../controllers/challengesController")
const params = require('./params')

const express = require('express')
const router = express.Router({mergeParams: true})
const auth = require('../middleware/auth')

router.use(auth.authenticateJWT)

router.get('/',
    auth.authorizeUserAndTrainer,
    challengesController.getChallenges
)

router.post(`/`,
    auth.authorizeTrainer,
    challengesController.createChallenge
)

router.patch(`/:${params.CHALLENGE_ID_PARAM}`,
    auth.authorizeUser,
    challengesController.enrollInChallenge
)

router.delete(`/:${params.CHALLENGE_ID_PARAM}`,
    auth.authorizeTrainer,
    challengesController.closeChallenge
)

module.exports = router
