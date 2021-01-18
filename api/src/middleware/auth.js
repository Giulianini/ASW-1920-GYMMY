const jwt = require("jsonwebtoken")

const secret = process.env.JWT_SECRET

exports.authenticateJWT = (req, res, next) => {
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]
        if (bearerToken) {
            jwt.verify(bearerToken, secret, (err, user) => {
                if (err) {
                    console.log("user not authenticated")
                    return res.sendStatus(401);
                }
                console.log('authentication ok')
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
        res.sendStatus(403)
    }
}

exports.authorizeTrainer = (req, res, next) => {
    const role = req.user.role
    if (role === 'trainer') {
        next()
    } else {
        res.sendStatus(403)
    }
}
