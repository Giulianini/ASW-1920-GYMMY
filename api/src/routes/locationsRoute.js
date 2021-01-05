const { createLocation } = require("../controllers/locationsController")

const express = require('express')
const router = express.Router()
const authenticate = require('../middleware/auth')

router.post('/', /*authenticate,*/ createLocation)

module.exports = router