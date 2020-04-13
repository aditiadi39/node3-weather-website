const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
app.use(express.static(publicDirectoryPath))

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Aditi'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Robot',
        name: 'Aditi'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Robot',
        name: 'Aditi'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address)
    {
        return res.send({
            error: 'You must provide an address to check weather!'
        })
    }
    
    geocode(req.query.address, (error, {latitude, longitude, location}) => {
        if(error)
        {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error)
            {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    /*res.send({
        address: req.query.address
    })*/
})

app.get('/products', (req, res) => {
    if(!req.query.search)
    {
        return res.send({
            error: 'You must provide the search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Aditi',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Aditi',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('server started listening at 3000')
})