const log = (req, res, next) => {
    const method = req.method
    const originalUrl = req.originalUrl;
    const contentType = req.header('Content-Type')

    console.log(`${method} ${originalUrl} Content-Type: ${contentType}`)

    next()
}

module.exports = log