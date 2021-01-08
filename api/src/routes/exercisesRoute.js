const exercisesController = require("../controllers/exercisesController")
const params = require('./params')

const express = require('express')
const router = express.Router()
const authenticate = require('../middleware/auth')

router.get('/', exercisesController.getAllExercises)

router.get(`/:${params.EXERCISE_NAME_PARAM}`, exercisesController.getExercise)

router.post('/', /*authenticate,*/ exercisesController.createExercise)

router.patch(`/:${params.EXERCISE_NAME_PARAM}`, exercisesController.updateExerciseLocations)

router.delete(`/:${params.EXERCISE_NAME_PARAM}`, exercisesController.removeExercise)

module.exports = router