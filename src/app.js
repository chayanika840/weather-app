const path = require('path');
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname);

const app = express();
const port = process.env.PORT || 3000;


// !SETTING UP PATHS
const pathToDir = path.join(__dirname, '../public');

// for changing the directory of hbs
const pathToViews = path.join(__dirname, '../templates/views');

const pathToPartials = path.join(__dirname, '../templates/partials');


// !SETTING UP HBS & VIEWS LOCATION

// telling express which templating engine we are using
// setting up hbs
// this expects all our templates to live in a specific folder = in root a folder called views
app.set('view engine', 'hbs');

// telling express where to find views
app.set('views', pathToViews);

// telling express where to find views
hbs.registerPartials(pathToPartials);

// !SETTING UP STATIC DIR TO SERVE
// used to fetch different elements in public folder
// by default shows index
app.use(express.static(pathToDir));

// setting up hbs root
app.get('', (req, res) => {
    // instead of using send we will use render which takes some args
    // 1. name of hbs file
    // 2. values to be used as object

    res.render('index', {
        title: 'WEATHER',
        name:'Joyal'
    })
})

// setting up hbs about
app.get('/about', (req, res) => {
    // instead of using send we will use render which takes some args
    // 1. name of hbs file
    // 2. values to be used as object

    res.render('about', {
        title: 'ABOUT',
        name: 'Joyal',
        form:'hbs'
    })
})

// setting up hbs help
app.get('/help', (req, res) => {
    // instead of using send we will use render which takes some args
    // 1. name of hbs file
    // 2. values to be used as object

    res.render('help', {
        title: 'HELP',
        name: 'Joyal',
        msg:'Hello how can I help you?'
    })
})

// will take to home page also called root
app.get('', (req,res) => {
    res.send('Hello');
})

// will take to help page

// //app.get('/help', (req,res) => {
//   //  res.send('Help');
// //})

// these won't need any html file
// will take to about

// //app.get('/about', (req,res) => {
//    // res.send('About');
// //})

// will take to weather
// ! MAIN WORKING
app.get('/weather', (req,res) => { 
    
    // if there is no address => give error
    if(!req.query.address){
        return res.send({
            error: "Please enter address!"
        })
    }

    const loc = req.query.address;
    geocode(loc, (error, {latitude, longitude, location} = {}) => {
    
        if(error){
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecast) => {
                if(error){
                    return res.send({error})
                }
                
                res.send({
                    location,
                    forecast,
                    address: req.query.address //=> this is too precise = creates confusion
                    
                })    
        })       
    })

    // fetch the address provided and send as object
    // res.send({
    //     address: req.query.address, 
    //     forecast: "Snowing",
    // })

    
})

// todo: learning to make query string
// app.get('/products', (req,res) => {
    
//     // queries are added at end of link preceding with a ?
//     // http://localhost:3000/products?search="book"
//     // * this can be fetched using req.query.search

//     // console.log(req.query);
    
//     if(!req.query.search){
//         return res.send({
//             error: "Please provide a search term"
//         })
//     }
    
//     res.send({
//         products: [],
//     });
// })

// matches to routes starting from /help/<anything>
app.get('/help/*',(req,res) => {
    res.render('error',{
        title: '404 ERROR',
        msg: 'Help content not found!',
        name: 'Joyal'
    })
})

// for 404 error page
// '*' is a wild card that means match all rest if none of the above is matched
app.get('*', (req,res) => {
    res.render('error',{
        title: '404 ERROR',
        msg: 'Page not found!',
        name: 'Joyal'
    })
})

app.listen(port, () => {
    console.log("server up on " + port);
})