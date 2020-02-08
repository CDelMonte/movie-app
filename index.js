const express = require('express')
const omdbClient = require('omdb-client')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

const config = {
    mongoUrl: "mongodb+srv://admin:Password1@cluster0-hepyq.mongodb.net/test?retryWrites=true&w=majority",
    database: "movies"
}

app.set("mongoUrl", config.mongoUrl)
app.set("database", config.database)

const AppRoutes = require("./src/routes/app-routes")
const ModelRoutes = require("./src/routes/model-routes")

app.use('/', express.static('public'))

app.use( bodyParser.json() ) // to support JSON-encoded bodies

const router = express.Router()

AppRoutes.getRoutes(app, router)
ModelRoutes.getRoutes(app, router)

app.use("/api", router)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
