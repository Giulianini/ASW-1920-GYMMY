const exercisesController = require("../controllers/exercisesController")
const params = require('./params')

const express = require('express')
const router = express.Router()
const authenticate = require('../middleware/auth')

const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.get('/', exercisesController.getAllExercises)

router.get(`/:${params.EXERCISE_NAME_PARAM}`, exercisesController.getExercise)

router.post('/', /*authenticate,*/ exercisesController.createExercise)

router.get(`/:${params.EXERCISE_NAME_PARAM}/${params.EXERCISE_IMAGE_ROUTE}`, exercisesController.getExerciseImage)

router.put(`/:${params.EXERCISE_NAME_PARAM}/${params.EXERCISE_IMAGE_ROUTE}`,
    upload.single('image'), exercisesController.createExerciseImage)

router.delete(`/:${params.EXERCISE_NAME_PARAM}/${params.EXERCISE_IMAGE_ROUTE}`, exercisesController.removeExerciseImage)

router.patch(`/:${params.EXERCISE_NAME_PARAM}`, exercisesController.updateExerciseLocations)

router.delete(`/:${params.EXERCISE_NAME_PARAM}`, exercisesController.removeExercise)

module.exports = router