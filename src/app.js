const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//console.log(__dirname)
//  .log(path.join(__dirname,'../public'))


const app = express()

//Define paths for express config
const viewsPath = path.join(__dirname,'../templates/views')
const publicDirectoryPath = path.join(__dirname,'../public')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebar engine and views location

//In order to use dynamic rendering engine for express
app.set('view engine','hbs')
//In order to let hbs look for templates folder instead of default views folder
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index',{
        title : 'Weather App',
        name : 'Aman Agarwal'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title : 'About Me',
        name : 'Aman Agarwal'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title  : 'Help',
        message : 'Ask for any help',
        name : 'Aman Agarwal'
    })
})

//root url is bydefault linked to index.html as it conveys special meaning, so below code wont get executed
app.get('',(req,res) => {
    res.send('<h1>weather</h1>')
})

app.get('/products',(req,res) =>  {
    console.log(!req.query.search)
    if(!req.query.search){
        res.send({
            error : 'You must provide a search term'
        })
    }else{
        res.send({
            products : []
        })
    }
})

app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error : 'You must provide an address'
        })
    }

    geocode.geocode(req.query.address,(error,{latitude,longitude,location}={}) => {
        if(error){
            return res.send({
                error : error
            })
        }
        forecast.forecast(latitude,longitude,(error,forecastData) => {
            if(error){
               return res.send({
                   error : error
               })
            }
            res.send({
                location : location,
                forecast : forecastData,
                address : req.query.address
            })
        })
    })
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        title : '404',
        name : 'Aman',
        errorMessage : 'Help article not found'
    })
    //res.send('Help article not found')
})


app.get('*',(req,res) => {
    res.render('404',{
        title : '404',
        name : 'Aman',
        errorMessage : 'Page not found'
    })
    //res.send('Page not found')
})


// app.get('/help',(req,res) => {
//     res.send([{name:'Andrew',age:57},{name : 'Sara',age : 60}])
// })

// app.get('/about',(req,res) => {
//     res.send('<h1>About Page</h1>')
// })




//process of calling server is asynchronous and we can call pass callback function also
app.listen(3000,() => {
    console.log('Server is up on port 3000.')
})

