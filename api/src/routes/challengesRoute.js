const challengesController = require("../controllers/challengesController")
const params = require('./params')

const express = require('express')
const router = express.Router({ mergeParams: true })
const auth = require('../middleware/auth')

router.get('/', challengesController.getChallenges)

router.post('/', challengesController.createChallenge)

module.exports = router
