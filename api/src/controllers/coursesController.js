const responses = require('./util/responses')
const params = require('../routes/params')

const Course = require('../models/Course')

exports.getCourses = async function(req, res) {
    const courses = await Course.find().exec()
    responses.json(res)(courses)
}

exports.createCourse = async function(req, res) {
    const title = req.body.title
    const description = req.body.description

    if (!title) {
        return responses.badRequest(res)('No title specified')
    }
    if (!description) {
        return responses.badRequest(res)('No title specified')
    }

    try {
        const course = new Course({
            title: title,
            description: description,
            participants: []
        })
        await course.save()
        responses.created(res)(course)
    } catch (err) {
        responses.error(res)(err)
    }
}

exports.removeCourse = async function(req, res) {
    const courseId = req.params[params.COURSE_ID_PARAM]
    const foundCourse = await Course.findOne({ _id: courseId }).exec()
    if (foundCourse) {
        Course.findByIdAndDelete(courseId)
            .exec()
            .then(() => {
                responses.ok(res)
            })
    } else {
        responses.notFound(res)('Course not found')
    }
}

exports.enrollInCourse = async function(req, res) {
    const courseId = req.params[params.COURSE_ID_PARAM]
    const username = req.body.username

    if (!username) {
        return responses.badRequest(res)('No username specified')
    }

    const foundCourse = await Course.findById(courseId).exec()
    if (!foundCourse) {
        return responses.notFound(res)('Course not found')
    }

    const participants = foundCourse.participants
    if (participants.includes(username)) {
        return responses.badRequest('User is already enrolled in this course')
    }

    try {
        participants.push(username)
        await foundCourse.save()
        responses.noContent(res)
    } catch (err) {
        responses.error(res)(err)
    }
}

exports.createCourseImage = async function(req, res) {
    const courseId = req.params[params.COURSE_ID_PARAM]

    const foundCourse = await Course.findById(courseId).exec()
    if (!foundCourse) {
        return responses.notFound(res)('Course not found')
    }

    try {
        const img = req.file.buffer
        const contentType = req.file.mimetype
        foundCourse.image = {
            data: img,
            contentType: contentType
        }
        await foundCourse.save()
        responses.noContent(res)
    } catch (err) {
        responses.error(res)(err)
    }
}

exports.getCourseImage = async function(req, res) {
    const courseId = req.params[params.COURSE_ID_PARAM]

    const foundCourse = await Course.findById(courseId).exec()
    if (!foundCourse) {
        return responses.notFound(res)('Course not found')
    }

    const foundImage = foundCourse.image
    if (!foundImage) {
        return responses.notFound(res)('Course image not found')
    }

    res.contentType(foundImage.contentType).send(foundImage.data)
}