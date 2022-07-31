const request = require('request');

const forecast = (latitude,longitude, cb) => {
    const url = 'http://api.weatherstack.com/current?access_key=78e86b92ee2457a7fc446a9855d872f4&query=' + latitude + ',' + longitude;

    // request({url : url, json:true}, (error, response) => {
    // shorthand as nameof var and parameter were same
    // also response is an object so destruct it too
    request({url, json:true}, (error, {body}) => {
        if(error){
            cb('Unable to connect to weather service!', undefined);
        }
        // else if(response.body.error){
        else if(body.error){
            cb('Unable to find location', undefined);
        }
        else{
            cb(undefined, 
                `Location ~ ${body.location.name} : ${body.current.weather_descriptions[0]}! It is currently ${body.current.temperature} degrees out. With ${body.current.precip}% chance of rain !`
            )
        }
    })

}

module.exports = forecast;