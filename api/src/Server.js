const fs = require('fs');
const http = require('http');
const https = require('https');

const path = require('path')
const privateKey  = fs.readFileSync(path.resolve(__dirname, './security/cert.key'), 'utf8');
const certificate = fs.readFileSync(path.resolve(__dirname, './security/cert.pem'), 'utf8');

if (!process.env.DOCKER) { // Check if inside a container
    require('dotenv').config({ path: path.resolve(__dirname, '../../.local.env') })
}

console.log("Docker: " + process.env.DOCKER)

const credentials = {key: privateKey, cert: certificate};
const express = require('express');
const app = express();

const mongoose = require('mongoose')

// your express configuration here
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

const bodyParser = require("body-parser")

const usersRoute = require('./routes/usersRoute')
const sessionRoute = require('./routes/sessionRoute')
const locationsRoute = require('./routes/locationsRoute')

app.use(bodyParser.json())

app.use('/users', usersRoute)

app.use('/session', sessionRoute)

app.use('/locations', locationsRoute)

app.get("/", (req, res) => {
    res.send("Gymmy API")
})

const dbConnection = process.env.DB_CONNECTION;
const dbName = process.env.DB_NAME;
const dbAdmin = process.env.DB_ADMIN
const dbPassword = process.env.DB_ADMIN_PWD
console.log("connection " + dbConnection)
console.log("name " + dbName)
mongoose.connect(
    dbConnection.concat(dbName),
    {
        auth: {authSource: "admin"},
        user: dbAdmin,
        pass: dbPassword,
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    (err, db) => {
        if (err) {
            console.log('Could not connect to database ' + err)
        } else {
            console.log(`Connected to ${dbName} @ ${dbConnection}`)
        }
    }
)

const httpPort = process.env.HTTP_PORT;
httpServer.listen(httpPort, () => {
    console.log('Listening on port ' + httpPort)
});

const httpsPort = process.env.HTTPS_PORT;
httpsServer.listen(httpsPort, () => {
    console.log('Listening on port ' + httpsPort)
});

