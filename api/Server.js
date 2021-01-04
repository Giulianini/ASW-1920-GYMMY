var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('./security/cert.key', 'utf8');
var certificate = fs.readFileSync('./security/cert.pem', 'utf8');

var credentials = {key: privateKey, cert: certificate};
var express = require('express');
var app = express();

const jwt = require("jsonwebtoken")
const bodyParser = require("body-parser")

// your express configuration here

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

const users = [
    {
        username: 'john',
        password: 'password123admin',
        role: 'admin'
    },
    {
        username: 'anna',
        password: 'password123member',
        role: 'member'
    }
];
const secret = "FRoSQJADeamCZ+0ILQBxDMGFtDeIx8tAPaFSMruoptLMswgKG9R8vOtwc9I+e6HxHN4tzOZDV27w2cKezkX5sw=="

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

app.use(bodyParser.json())

app.get("/nibba", authenticateJWT, (req, res) => {
    const { role } = req.user
    console.log(role)

    if (role !== 'admin') {
        console.log("Forbidden nibba")
        return res.sendStatus(403);
    }

    res.send("heres yo chickennugget")
})

app.get("/", (req, res) => {
    console.log(req)
    res.send("Dionigga")
})

app.post('/login', (req, res) => {
    const {username, password} = req.body
    const user = users.find(u => u.username === username && u.password === password)

    console.log(req.body)

    if (user) {
        const accessToken = jwt.sign({username: user.username, role: user.role}, secret)
        res.json({accessToken})
    } else {
        res.send('Username or password incorrect')
    }
})

httpServer.listen(8080);
httpsServer.listen(443);

