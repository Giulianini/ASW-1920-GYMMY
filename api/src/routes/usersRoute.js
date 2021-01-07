const express = require('express')
const router = express.Router()
const authenticate = require('../middleware/auth')

const usersController = require('../controllers/usersController')

router.get('/', authenticate, usersController.getAllUsers)

router.get('/:username', usersController.getUser)

router.post('/', usersController.createUser)

router.delete('/:username', usersController.removeUser)

module.exports = router