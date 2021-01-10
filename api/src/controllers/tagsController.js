const responses = require('./util/responses')
const params = require('../routes/params')

const Tag = require('../models/Tag')

exports.getAllTags = async function(req, res) {
    const tags = await Tag.find().exec()
    responses.json(res)(tags)
}

exports.getTag = async function(req, res) {
    const tagName = req.params[params.TAG_NAME_PARAM]

    const foundTag = await Tag.findOne({ name: tagName }).exec()
    if (foundTag) {
        responses.json(res)(foundTag)
    } else {
        responses.notFound(res)
    }
}

exports.createTag = async function(req, res) {

}

exports.removeTag = async function(req, res) {

}
