/* 2-- */

exports.ok = (res) => {
    res.sendStatus(200)
}

exports.json = (res) => (payload) => {
    res.status(200).json(payload)
}

exports.created = (res) => (payload) => {
    res.status(201).json(payload)
}

exports.noContent = (res) => {
    res.sendStatus(204)
}

/* 4-- */

exports.badRequest = (res) => (message) => {
    res.status(400).send(message)
}

exports.unauthorized = (res) => {
    res.sendStatus(401)
}

exports.notFound = (res) => (message) => {
    res.status(404).send(message)
}

exports.conflict = (res) => {
    res.sendStatus(409)
}

/* 5-- */

exports.error = (res) => (err) => {
    res.status(500).json({ message: err })
}