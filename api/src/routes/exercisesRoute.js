const exercisesController = require("../controllers/exercisesController")

const express = require('express')
const router = express.Router()
const authenticate = require('../middleware/auth')

router.get('/:exerciseName', exercisesController.getExercise)

router.post('/', /*authenticate,*/ exercisesController.createExercise)

module.exports = router