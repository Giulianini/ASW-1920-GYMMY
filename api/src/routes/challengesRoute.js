const challengesController = require("../controllers/challengesController")
const params = require('./params')

const express = require('express')
const router = express.Router({ mergeParams: true })
const auth = require('../middleware/auth')

router.get('/', challengesController.getChallenges)

router.post(`/`, challengesController.createChallenge)

router.patch(`/:${params.CHALLENGE_ID_PARAM}`, challengesController.enrollInChallenge)

router.delete(`/:${params.CHALLENGE_ID_PARAM}`, challengesController.closeChallenge)

module.exports = router
