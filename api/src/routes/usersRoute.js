const express = require('express')
const router = express.Router()
const authenticate = require('../middleware/auth')

const usersController = require('../controllers/usersController')

router.get('/', authenticate, usersController.getAllUsers)

router.post('/', usersController.createUser)

module.exports = router