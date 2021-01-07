exports.ok = (res) => {
    res.sendStatus(200)
}

exports.created = (res) => (json) => {
    res.status(201).json(json)
}

exports.conflict = (res) => {
    res.sendStatus(409)
}

exports.error = (res) => (err) => {
    res.status(500).json({ message: err })
}