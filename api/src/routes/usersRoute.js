const express = require('express')
const router = express.Router()
const authenticate = require('../middleware/auth')
const params = require('./params')

const usersController = require('../controllers/usersController')
const trainingCardsController = require('../controllers/trainingCardsController')

/* User */

router.get('/', authenticate, usersController.getAllUsers)

router.get(`/:${params.USERNAME_PARAM}`, usersController.getUser)

router.post('/', usersController.createUser)

router.patch(`/:${params.USERNAME_PARAM}/measures`, usersController.updateMeasures)

router.delete(`/:${params.USERNAME_PARAM}`, usersController.removeUser)

/* Objective */

router.get(`/:${params.USERNAME_PARAM}/${params.OBJECTIVE_ROUTE}`, usersController.getUserObjective)

router.post(`/:${params.USERNAME_PARAM}/${params.OBJECTIVE_ROUTE}`, usersController.createUserObjective)

router.patch(`/:${params.USERNAME_PARAM}/${params.OBJECTIVE_ROUTE}`, usersController.updateUserObjective)

module.exports = router