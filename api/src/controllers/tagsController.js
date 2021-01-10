const responses = require('./util/responses')

const Tag = require('../models/Tag')

exports.getAllTags = async function(req, res) {
    const tags = await Tag.find().exec()
    responses.json(res)(tags)
}

exports.getTag = async function(req, res) {

}

exports.createTag = async function(req, res) {

}

exports.removeTag = async function(req, res) {

}
