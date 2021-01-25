const trainingExecutionsController = require("../controllers/trainingExecutionsController")
const params = require('./params')

const express = require('express')
const router = express.Router({mergeParams: true})
const auth = require('../middleware/auth')

router.use(auth.authenticateJWT)

router.get('/',
    auth.authorizeUserAndTrainer,
    auth.ensureUserOwnsInfo,
    trainingExecutionsController.getExecution
)

router.put('/',
    auth.authorizeUser,
    auth.ensureUserOwnsInfo,
    trainingExecutionsController.createExecution
)

router.patch('/',
    auth.authorizeUser,
    auth.ensureUserOwnsInfo,
    trainingExecutionsController.updateExecution
)

router.delete('/',
    auth.authorizeUser,
    auth.ensureUserOwnsInfo,
    trainingExecutionsController.removeExecution
)

module.exports = router