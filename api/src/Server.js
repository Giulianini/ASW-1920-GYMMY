const fs = require('fs');
const http = require('http');
const https = require('https');

const path = require('path')
const privateKey  = fs.readFileSync(path.resolve(__dirname, './security/cert.key'), 'utf8');
const certificate = fs.readFileSync(path.resolve(__dirname, './security/cert.pem'), 'utf8');

require('dotenv').config({path: path.resolve(__dirname, '../.env')})

console.log("Docker: " + process.env.DOCKER)

const credentials = {key: privateKey, cert: certificate};
const express = require('express');
const app = express();

const mongoose = require('mongoose')

// your express configuration here
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

const cors = require('cors')
const bodyParser = require("body-parser")
const log = require('./middleware/log')

const usersRoute = require('./routes/usersRoute')
const sessionRoute = require('./routes/sessionRoute')
const locationsRoute = require('./routes/locationsRoute')
const exercisesRoute = require('./routes/exercisesRoute')
const trainingCardsRoute = require('./routes/trainingCardsRoute')
const tagsRoute = require('./routes/tagsRoute')
const executionRoute = require('./routes/trainingExecutionsRoute')

app.use(cors())
app.use(bodyParser.json())
app.use(log)

const params = require('./routes/params')

app.use('/users', usersRoute)

app.use('/session', sessionRoute)

app.use('/locations', locationsRoute)

app.use('/exercises', exercisesRoute)

app.use(`/users/:${params.USERNAME_PARAM}/${params.USER_CARDS_ROUTE}`, trainingCardsRoute)

app.use(`/users/:${params.USERNAME_PARAM}/${params.EXECUTION_ROUTE}`, executionRoute)

app.use('/tags', tagsRoute)

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

