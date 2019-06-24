const path = require('path')
const express = require('express')
const hbs = require('hbs')

const location = require('./util/geolocation')
const weather = require('./util/weather')

var pageInfo ={
    title : 'Weather',
    author : 'npacifique', 
    error : ' '
    
}

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicPath = path.join(__dirname, '../public') 
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//set static directory to server 
app.use(express.static(publicPath))


//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


//routes
app.get('',(req, res)=>
{
    res.render('index',
        // {title: 'Weather', name : 'Pacifique'}
        pageInfo
    )
})

app.get('/about', (req, res)=>{
    res.render('about',
        //{title: 'About me',name : 'Pacifique'}
        pageInfo
    )
})

app.get('/help', (req, res)=>{
    res.render('help',
        //{ title: 'Help', helpText: '', name : 'Pacifique' }
        pageInfo
        
    )
})


//static route return a json object
//http://localhost:3000/weather?address=parma,ohio
app.get('/weather',(req,res)=>{
       
    if(!req.query.address){
       return res.send(
           pageInfo.error ='You must provide an address'
       )
    }
   
    location.getLocation(req.query.address, (cordinate)=>
   {
       weather.getWeather(cordinate.body.features[0],(_weather)=>{
           res.send({
               cordinate : cordinate.body.features[0].center,
               place : cordinate.body.features[0].place_name,
               currentWeather : _weather.currently, 
               dailyWeather : _weather.daily,
           })
       })       
    })

})


//this route will handle all none defined routes
app.get('*', (req,res)=>
{
    pageInfo.error ="We can't seem to find the page you're looking for."
    res.render('errorPage', pageInfo)
})

//run the server and setup server listerning port 
app.listen(port, ()=>{
    console.log('Server is up on port '+port)
    
})
