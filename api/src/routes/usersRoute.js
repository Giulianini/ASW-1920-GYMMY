const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const params = require('./params')

const usersController = require('../controllers/usersController')

router.use(auth.authenticateJWT)

/* User */

router.get('/',
    auth.authorizeTrainer,
    usersController.getAllUsers
)

router.get(`/:${params.USERNAME_PARAM}`,
    auth.authorizeUserAndTrainer,
    auth.ensureUserOwnsInfo,
    usersController.getUser
)

router.post('/',
    usersController.createUser
)

router.patch(`/:${params.USERNAME_PARAM}/measures`,
    auth.authorizeUserAndTrainer,
    auth.ensureUserOwnsInfo,
    usersController.updateMeasures
)

router.delete(`/:${params.USERNAME_PARAM}`,
    auth.authorizeUserAndTrainer,
    auth.ensureUserOwnsInfo,
    usersController.removeUser
)

/* Objective */

router.get(`/:${params.USERNAME_PARAM}/${params.OBJECTIVE_ROUTE}`,
    auth.authorizeUserAndTrainer,
    auth.ensureUserOwnsInfo,
    usersController.getUserObjective
)

router.post(`/:${params.USERNAME_PARAM}/${params.OBJECTIVE_ROUTE}`,
    auth.authorizeUserAndTrainer,
    auth.ensureUserOwnsInfo,
    usersController.createUserObjective
)

router.patch(`/:${params.USERNAME_PARAM}/${params.OBJECTIVE_ROUTE}`,
    auth.authorizeUserAndTrainer,
    auth.ensureUserOwnsInfo,
    usersController.updateUserObjective
)

module.exports = router