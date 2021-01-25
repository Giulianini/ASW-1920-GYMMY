const coursesController = require("../controllers/coursesController")
const params = require('./params')

const express = require('express')
const router = express.Router({mergeParams: true})
const auth = require('../middleware/auth')

const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({storage: storage})

router.use(auth.authenticateJWT)

router.get('/',
    auth.authorizeUserAndTrainer,
    coursesController.getCourses
)

router.post('/',
    auth.authorizeTrainer,
    coursesController.createCourse
)

router.delete(`/:${params.COURSE_ID_PARAM}`,
    auth.authorizeTrainer,
    coursesController.removeCourse
)

router.patch(`/:${params.COURSE_ID_PARAM}`,
    auth.authorizeUser,
    coursesController.enrollInCourse
)

router.get(`/:${params.COURSE_ID_PARAM}/${params.COURSE_IMAGE_ROUTE}`,
    auth.authorizeUserAndTrainer,
    coursesController.getCourseImage
)

router.put(`/:${params.COURSE_ID_PARAM}/${params.COURSE_IMAGE_ROUTE}`,
    upload.single('image'),
    auth.authorizeTrainer,
    coursesController.createCourseImage
)

module.exports = router