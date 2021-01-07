/* 2-- */

exports.ok = (res) => {
    res.sendStatus(200)
}

exports.json = (res) => (json) => {
    res.status(200).json(json)
}

exports.created = (res) => (json) => {
    res.status(201).json(json)
}

exports.noContent = (res) => {
    res.sendStatus(204)
}

/* 4-- */

exports.notFound = (res) => {
    res.sendStatus(404)
}

exports.conflict = (res) => {
    res.sendStatus(409)
}

/* 5-- */

exports.error = (res) => (err) => {
    res.status(500).json({ message: err })
}