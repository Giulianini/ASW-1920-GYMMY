const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const params = require('./params')

const tagsController = require('../controllers/tagsController')

router.use(auth.authenticateJWT)

router.get('/',
    auth.authorizeUserAndTrainer,
    tagsController.getAllTags
)

router.get(`/:${params.TAG_NAME_PARAM}`,
    auth.authorizeUserAndTrainer,
    tagsController.getTag
)

router.post('/',
    auth.authorizeTrainer,
    tagsController.createTag
)

router.delete(`/:${params.TAG_NAME_PARAM}`,
    auth.authorizeTrainer,
    tagsController.removeTag
)

module.exports = router