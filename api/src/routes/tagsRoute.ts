const express = require('express')
const router = express.Router()
const authenticate = require('../middleware/auth')
const params = require('./params')

const tagsController = require('../controllers/tagsController')

router.get('/', tagsController.getAllTags)

router.get(`/:${params.TAG_NAME_PARAM}`, tagsController.getTag)

router.post('/', tagsController.createTag)

router.delete('/', tagsController.removeTag)