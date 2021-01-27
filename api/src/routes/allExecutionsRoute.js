const allExecutionsContoller = require("../controllers/allExecutionsContoller")
const params = require('./params')

const express = require('express')
const router = express.Router({mergeParams: true})
const auth = require('../middleware/auth')

router.use(auth.authenticateJWT)

router.get('/',
    auth.authorizeTrainer,
    allExecutionsContoller.getAllExecutions
)

module.exports = router