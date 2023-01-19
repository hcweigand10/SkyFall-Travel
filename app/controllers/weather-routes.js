var APIKey = process.env.API
var baseURL = 'https://api.openweathermap.org/data/2.5/';
const router = require('express').Router();
const axios = require('axios');
//Takes the city name or zip code from the user and searches for the weather.
router.get('/:city', async (req, res) => {
    const city=toTitleCase(req.params.city);
    const response = await getWeatherReportByCity(city);
    res.json(response);
    
})


//Turns the search queries into title case regardless of how they were input
function toTitleCase(str) {
    return str.replace(/(?:^|\s)\w/g, function(match) {
        return match.toUpperCase();
    });
}


//Uses the city name (or zip code) to get the longitude and latitude by calling the getLongAndLat function and then passes it into getWeatherByLongAndLat to get the 5day forecast

function getWeatherReportByCity(city) {
    return getLongAndLat(city).then(function(data){  
          return getWeatherByLongAndLat(data['lat'], data['long']);
        }
    )
}


//uses the city name or zip code to get the longitude and latitude needed to get the five day forecast
async function getLongAndLat(city){
  var getLogLatUrl = encodeURI(baseURL+'/weather?q=' + city + "&appid=" + APIKey);
        return await axios({
            method: 'get',
            url: getLogLatUrl
        }).then(function(response){
            const data = response['data'];
            return {
                lat: data['coord']['lat'],
                long: data['coord']['lon']
            };
        }).catch((error) => {
            return ['error'];
        })
}


//Uses the longitude and latitude to get the 5day forecast
function getWeatherByLongAndLat(lat, long) {
    var queryURL  = encodeURI(baseURL + 'onecall?lat=' + lat +'&lon='+ long + '&exclude=hourly,minutely&units=imperial&appid=' + APIKey);
    return axios({
        method: 'get',
        url: queryURL
    }).then(function(response){
        data = response['data'];
        const currentWeather = data['current'];
        //Adds the current weather information to the forecast object before returning the object
        return {
            curTemp : currentWeather['temp'],
            feelsLinkTemp: currentWeather['feels_like'],
            condition: currentWeather['weather'][0]['main'],
            description: currentWeather['weather'][0]['description']
        };
    }).catch((error) => {
        return ['error'];
    })
}

module.exports = router;