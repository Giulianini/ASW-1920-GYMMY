const progressThresholdsController = require("../controllers/progressThresholdsController")
const params = require('./params')

const express = require('express')
const router = express.Router({mergeParams: true})
const auth = require('../middleware/auth')

router.use(auth.authenticateJWT)

router.get('/',
    auth.authorizeUserAndTrainer,
    progressThresholdsController.getThreshold
)

router.put(`/`,
    auth.authorizeTrainer,
    progressThresholdsController.createThreshold
)

router.patch(`/`,
    auth.authorizeTrainer,
    progressThresholdsController.modifyThreshold
)

module.exports = router