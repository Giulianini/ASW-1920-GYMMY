const exercisesController = require("../controllers/exercisesController")
const params = require('./params')

const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.get('/', auth.authenticateJWT, exercisesController.getAllExercises)

router.get(`/:${params.EXERCISE_NAME_PARAM}`, auth.authenticateJWT, exercisesController.getExercise)

router.post('/', auth.authenticateJWT, exercisesController.createExercise)

router.get(`/:${params.EXERCISE_NAME_PARAM}/${params.EXERCISE_IMAGE_ROUTE}`, auth.authenticateJWT, exercisesController.getExerciseImage)

router.put(`/:${params.EXERCISE_NAME_PARAM}/${params.EXERCISE_IMAGE_ROUTE}`,
    upload.single('image'), auth.authenticateJWT, exercisesController.createExerciseImage)

router.delete(`/:${params.EXERCISE_NAME_PARAM}/${params.EXERCISE_IMAGE_ROUTE}`, auth.authenticateJWT, exercisesController.removeExerciseImage)

router.patch(`/:${params.EXERCISE_NAME_PARAM}`, auth.authenticateJWT, exercisesController.updateExerciseLocations)

router.delete(`/:${params.EXERCISE_NAME_PARAM}`, auth.authenticateJWT, exercisesController.removeExercise)

module.exports = router