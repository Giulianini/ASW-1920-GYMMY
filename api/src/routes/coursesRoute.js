const coursesController = require("../controllers/coursesController")
const params = require('./params')

const express = require('express')
const router = express.Router({ mergeParams: true })
const auth = require('../middleware/auth')

const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.get('/', coursesController.getCourses)

router.post('/', coursesController.createCourse)

router.delete(`/:${params.COURSE_ID_PARAM}`, coursesController.removeCourse)

router.patch(`/:${params.COURSE_ID_PARAM}`, coursesController.enrollInCourse)

router.get(`/:${params.COURSE_ID_PARAM}/${params.COURSE_IMAGE_ROUTE}`, coursesController.getCourseImage)

router.put(`/:${params.COURSE_ID_PARAM}/${params.COURSE_IMAGE_ROUTE}`,
    upload.single('image'), coursesController.createCourseImage)

module.exports = router