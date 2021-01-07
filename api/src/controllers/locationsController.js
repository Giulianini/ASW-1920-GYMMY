const { Location } = require('../models/Location')

exports.createLocation = async function(req, res) {
    const id = req.body.location
    const description = req.body.description
    try {
        const location = new Location({
            location: id,
            description: description
        })
        const createdLocation = await location.save();
        res.status(201).json(createdLocation)
    } catch (err) {
        res.status(500).json({ message: err })
    }
}