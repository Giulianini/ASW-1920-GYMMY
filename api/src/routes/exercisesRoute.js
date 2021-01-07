const { createExercise } = require("../controllers/exercisesController")

const express = require('express')
const router = express.Router()
const authenticate = require('../middleware/auth')

router.post('/', /*authenticate,*/ createExercise)

module.exports = router