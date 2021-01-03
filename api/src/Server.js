const fs = require('fs');
const http = require('http');
const https = require('https');

const path = require('path')
const privateKey  = fs.readFileSync(path.resolve(__dirname, './security/cert.key'), 'utf8');
const certificate = fs.readFileSync(path.resolve(__dirname, './security/cert.pem'), 'utf8');

require('dotenv/config')

const credentials = {key: privateKey, cert: certificate};
const express = require('express');
const app = express();

const mongoose = require('mongoose')

// your express configuration here
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

const jwt = require("jsonwebtoken")
const authenticateJWT = require('./middleware/auth')
const bodyParser = require("body-parser")

const usersRoute = require('./routes/usersRoute')

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

app.use(bodyParser.json())

app.use('/users', usersRoute)

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

const dbConnection = process.env.DB_CONNECTION;
const dbName = process.env.DB_NAME;
mongoose.connect(
    dbConnection.concat(dbName),
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log(`Connected to ${dbName} @ ${dbConnection}`)
)

const httpPort = process.env.HTTP_PORT;
httpServer.listen(httpPort, () => {
    console.log('Listening on port ' + httpPort)
});

const httpsPort = process.env.HTTPS_PORT;
httpsServer.listen(httpsPort, () => {
    console.log('Listening on port ' + httpsPort)
});

