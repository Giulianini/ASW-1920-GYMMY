const express = require('express')
const router = express.Router()
const authenticate = require('../middleware/auth')
const params = require('./params')

const usersController = require('../controllers/usersController')

router.get('/', authenticate, usersController.getAllUsers)

router.get(`/:${params.USERNAME_PARAM}`, usersController.getUser)

router.post('/', usersController.createUser)

router.patch(`/:${params.USERNAME_PARAM}/measures`, usersController.updateMeasures)

router.delete(`/:${params.USERNAME_PARAM}`, usersController.removeUser)


router.get(`/:${params.USERNAME_PARAM}/${params.USER_CARDS_PARAM}`, usersController.getUserCards)

router.get(`/:${params.USERNAME_PARAM}/${params.USER_CARDS_PARAM}/:${params.CARD_INDEX_PARAM}`, usersController.getUserCard)

module.exports = router