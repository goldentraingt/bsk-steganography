const express = require('express')
const expressHandlebars = require('express-handlebars')
const { json, urlencoded } = require('body-parser')
const requestIp = require('request-ip')
const path = require('path')

const mainRouter = require('./routers/')

const app = express()

app.use(json())

app.use(urlencoded({ extended: false }))

app.use(requestIp.mw())

const viewsPath = path.join(__dirname, '../views')

app.set('views', viewsPath)

app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',
    layoutsDir: path.join(viewsPath, '/layouts'),
    partialsDir: path.join(viewsPath, '/partials'),
    helpers: {

    }
}))

app.set('view engine', 'handlebars')

app.use('/', mainRouter)

module.exports = app