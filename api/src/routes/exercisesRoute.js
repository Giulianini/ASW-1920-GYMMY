const exercisesController = require("../controllers/exercisesController")
const params = require('./params')

const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({storage: storage})

router.use(auth.authenticateJWT)

router.get('/',
    auth.authorizeUserAndTrainer,
    exercisesController.getAllExercises
)

router.get(`/:${params.EXERCISE_NAME_PARAM}`,
    auth.authorizeUserAndTrainer,
    exercisesController.getExercise
)

router.post('/',
    auth.authorizeTrainer,
    exercisesController.createExercise
)

router.get(`/:${params.EXERCISE_NAME_PARAM}/${params.EXERCISE_IMAGE_ROUTE}`,
    auth.authorizeUserAndTrainer,
    exercisesController.getExerciseImage
)

router.put(`/:${params.EXERCISE_NAME_PARAM}/${params.EXERCISE_IMAGE_ROUTE}`,
    upload.single('image'),
    auth.authorizeTrainer,
    exercisesController.createExerciseImage
)

router.delete(`/:${params.EXERCISE_NAME_PARAM}/${params.EXERCISE_IMAGE_ROUTE}`,
    auth.authorizeTrainer,
    exercisesController.removeExerciseImage
)

router.patch(`/:${params.EXERCISE_NAME_PARAM}`,
    auth.authorizeTrainer,
    exercisesController.updateExerciseLocations
)

router.delete(`/:${params.EXERCISE_NAME_PARAM}`,
    auth.authorizeTrainer,
    exercisesController.removeExercise
)

module.exports = router