const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const log = console.log
const port = process.env.PORT || 3000

// log(__dirname)
// log(__filename)
const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')  
app.set('views', viewsPath)             //Handle Bars
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        creator: 'Deepanshu Kumar'
    })
})

app.get('/about',(req, res) => {
    res.render('about',{
        title: 'About Page',
        creator: 'Deepanshu Kumar'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        creator: 'Deepanshu Kumar'
    })
})

// app.get('', (req, res) => {
//     res.send('<h1>Hello Express!</h1>')
// })

// app.get('/help', (req,res) => {
//     res.send('Help page')
// })

// app.get('/about', (req,res) => {
//     res.send('<h2>About page</h2>')
// })

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please enter an address string location!'
        })
    }
    geocode(req.query.address, (error, { longitude, latitude, location } = {})=>{
        if(error){
            return res.send({
                error: error
            })
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error: error        //use shorthand if need {error}
                })
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
          })
    
    })
})

// app.get('/product', (req, res) => {
//     // console.log(req.query)
//     res.send({tt:'t'})
// })

app.get('/help/*', (req, res) => {
    res.render('error',{
        title: '404',
        errorMsg: 'Help article not found!',
        creator: 'Deepanshu Kumar'
    })
})

app.get('*', (req, res) => {
    res.render('error',{
        title: '404',
        errorMsg: 'Page not found!',
        creator: 'Deepanshu Kumar'
    })
})

// app.com
// app.com/help
// app.com/about

app.listen(port, () => {
    console.log('Server is up on port', port)
})
