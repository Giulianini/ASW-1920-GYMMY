const express = require('express')
const router = express.Router()
const authenticate = require('../middleware/auth')
const params = require('./params')

const usersController = require('../controllers/usersController')

/* User */

router.get('/', authenticate, usersController.getAllUsers)

router.get(`/:${params.USERNAME_PARAM}`, usersController.getUser)

router.post('/', usersController.createUser)

router.patch(`/:${params.USERNAME_PARAM}/measures`, usersController.updateMeasures)

router.delete(`/:${params.USERNAME_PARAM}`, usersController.removeUser)

/* Card */

router.get(`/:${params.USERNAME_PARAM}/${params.USER_CARDS_PARAM}`, usersController.getUserCards)

router.get(`/:${params.USERNAME_PARAM}/${params.USER_CARDS_PARAM}/:${params.CARD_INDEX_PARAM}`, usersController.getUserCard)

/* Objective */

router.get(`/:${params.USERNAME_PARAM}/${params.OBJECTIVE_PARAM}`, usersController.getUserObjective)

router.post(`/:${params.USERNAME_PARAM}/${params.OBJECTIVE_PARAM}`, usersController.createUserObjective)

router.patch(`/:${params.USERNAME_PARAM}/${params.OBJECTIVE_PARAM}`, usersController.updateUserObjective)

module.exports = router