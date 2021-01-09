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

module.exports = router