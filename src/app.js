const path = require('path')  // core module, does not need to be installed from npm
const express = require('express')
const hbs = require('hbs')
const geocode  = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000

// define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handles engire and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup Static directory to serve
app.use(express.static(path.join(publicDirectoryPath)))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Paul Jacy'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Paul Jacy'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This some helpful text',
        title: 'Help',
        name: 'Paul Jacy'
    })
})

 app.get('/weather', (req, res) => {

    if ( !req.query.address ) {
        return res.send({error: 'Address parameter is required!'})
    }

    geocode(req.query.address, (error, {latitude, longitude, location}={} ) => {

        if ( error ) {
            return res.send({error: error})
        }
     
        forecast(latitude, longitude, (error, forecastData) => {
     
         if ( error ) {
             return res.send({error: error})
         }

         res.send({
             location: location,
             forecast: forecastData,
             address: req.query.address
         })
     
       })
     })  
 })

 app.get('/products', (req, res) => {
    if ( !req.query.search ) {
        return res.send({error: 'You must provide a search term'})
    }

     console.log(req.query.search)
     res.send({
         products: []
     })
 })

//app.com        domain:  app.com     routes:  /help /about
//app.com/help
//app.com/about

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Paul Jacy'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Paul Jacy'
    })
})

app.listen(port, () => {
    console.log('server is up on port ' + port)
})