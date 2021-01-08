const exercisesController = require("../controllers/exercisesController")

const express = require('express')
const router = express.Router()
const authenticate = require('../middleware/auth')

router.get('/', exercisesController.getAllExercises)

router.get('/:exerciseName', exercisesController.getExercise)

router.post('/', /*authenticate,*/ exercisesController.createExercise)

router.patch('/:exerciseName', exercisesController.updateExerciseLocations)

router.delete('/:exerciseName', exercisesController.removeExercise)

module.exports = router