const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

// Define path for express opath
const viewPath = path.join(__dirname,'../templates/views')
const publicPath = path.join(__dirname,'../public')
const partialsPath = path.join(__dirname,'../templates/partials')

// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))
// console.log(viewPath)

const app = express()
// setup for handlebars engine 

app.set('view engine', 'hbs');
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

// setup static directory 
app.use(express.static(publicPath))


app.get('', (req,res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Sekar'
    
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title: 'About Me ...',
        name: 'Sekar'
    
    })
})

app.get('/products',(req,res) => {
    if (!req.query.search) {
        return res.send({
            error:' You must provide a search text'
        })
    }
    res.send({
        products: {}
    })
})


app.get('/help', (req,res) => {
    res.render('help',{
        helpText: 'This is help message to help with weather app',
        title: 'Help',
        name: 'Sekar'
  
    })
})

app.get('/weather',(req,res) => {
    if (!req.query.address ) { res.send( 'You must provide an address') }
    geocode (req.query.address,(error,{latitude,longitute,location}={})  => {
        if (error) {
            return res.send(error)
        } 
        forecast(latitude,longitute,(error,data) => {
            if (error) { 
                return res.send(error)
            }
        res.send ({
               forecast: 'It is ' + data.currentTemp  +  ' and feels like ' + data.feelsLikeTemp,
               address: req.query.address
              })
        })
     })
})


app.get('/help/*',(req,res)=> {
    res.render('404',{
        title: '404 - Error',
        errorText: 'Help article not found',
        name: 'Sekar'
    })
}
)

app.get('*',(req,res)=> {
    res.render('404',{
        title: '404',
        errorText: 'Page not found',
        name: 'Sekar'
    })
}
)



app.listen(3000,() => {
    console.log('Server is up on 3000')
})