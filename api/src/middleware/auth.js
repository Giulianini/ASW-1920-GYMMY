const jwt = require("jsonwebtoken")
const params = require("../routes/params")

const secret = process.env.JWT_SECRET

exports.authenticateJWT = (req, res, next) => {
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]
        if (bearerToken) {
            jwt.verify(bearerToken, secret, (err, user) => {
                if (err) {
                    console.log("[AUTH] user not authenticated")
                    return res.sendStatus(401);
                }
                console.log(`[AUTH] ${user.username} authentication OK`)
                req.user = user;
                req.token = bearerToken
                next();
            });
        } else {
            res.sendStatus(401)
        }
    } else {
        res.sendStatus(401)
    }
};

exports.authorizeUser = (req, res, next) => {
    const role = req.user.role
    if (role === 'user') {
        next()
    } else {
        console.log(`[AUTH] ${req.user.username} not authorized @ ${req.url}`)
        res.sendStatus(403)
    }
}

exports.authorizeTrainer = (req, res, next) => {
    const role = req.user.role
    if (role === 'trainer') {
        next()
    } else {
        console.log(`[AUTH] ${req.user.username} not authorized @ ${req.url}`)
        res.sendStatus(403)
    }
}

exports.authorizeUserAndTrainer = (req, res, next) => {
    const role = req.user.role
    if (role === 'user' || role === 'trainer') {
        next()
    } else {
        console.log(`[AUTH] ${req.user.username} not authorized @ ${req.url}`)
        res.sendStatus(403)
    }
}

exports.ensureUserOwnsInfo = (req, res, next) => {
    const username = req.user.username
    const role = req.user.role
    const usernameParam = req.params[params.USERNAME_PARAM]

    if (!username === usernameParam) {
        console.log(`[AUTH] ${req.user.username} doesn't own info @ ${req.url}`)
        res.sendStatus(403)
    } else if (role !== 'trainer') {
        console.log(`[AUTH] ${req.user.username} not authorized @ ${req.url}`)
        res.sendStatus(403)
    }

    next()
}