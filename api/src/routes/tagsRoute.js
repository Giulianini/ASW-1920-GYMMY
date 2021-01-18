const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const params = require('./params')

const tagsController = require('../controllers/tagsController')

router.get('/', tagsController.getAllTags)

router.get(`/:${params.TAG_NAME_PARAM}`, tagsController.getTag)

router.post('/', tagsController.createTag)

router.delete(`/:${params.TAG_NAME_PARAM}`, tagsController.removeTag)

module.exports = router