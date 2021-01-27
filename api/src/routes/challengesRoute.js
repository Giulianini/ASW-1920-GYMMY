const challengesController = require("../controllers/challengesController")
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
    challengesController.getChallenges
)

router.post(`/`,
    auth.authorizeTrainer,
    challengesController.createChallenge
)

router.patch(`/:${params.CHALLENGE_ID_PARAM}`,
    auth.authorizeUser,
    challengesController.enrollInChallenge
)

router.delete(`/:${params.CHALLENGE_ID_PARAM}`,
    auth.authorizeTrainer,
    challengesController.closeChallenge
)

router.get(`/:${params.CHALLENGE_ID_PARAM}/${params.CHALLENGE_IMAGE_ROUTE}`,
    auth.authorizeUserAndTrainer,
    challengesController.getChallengeImage
)

router.put(`/:${params.CHALLENGE_ID_PARAM}/${params.CHALLENGE_IMAGE_ROUTE}`,
    upload.single('image'),
    auth.authorizeTrainer,
    challengesController.createChallengeImage
)


module.exports = router
