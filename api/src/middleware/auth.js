const jwt = require("jsonwebtoken")

const secret = process.env.JWT_SECRET

const authenticateJWT = (req, res, next) => {
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]
        if (bearerToken) {
            jwt.verify(bearerToken, secret, (err, user) => {
                if (err) {
                    console.log("Forbidden authJwt")
                    return res.sendStatus(403);
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

module.exports = authenticateJWT