const jwt = require("jsonwebtoken")

const secret = process.env.JWT_SECRET

const authenticateJWT = (req, res, next) => {
    // const authHeader = req.headers.authorization;
    const token = req.header("x-access-token");

    if (token) {
        jwt.verify(token, secret, (err, user) => {
            if (err) {
                console.log("Forbidden authJwt")
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        console.log("Not authenticated")
        res.sendStatus(401);
    }
};

module.exports = authenticateJWT