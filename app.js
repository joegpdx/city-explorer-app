const express = require('express');
const app = express();
const cors = require('cors');
const geoData = require('./data/geo.json');
const weather = require('./data/darksky.json');

app.use(cors());

let lat;
let lng;

app.get('/location', (request, respond) => {
    const cityData = geoData.results[0];
    
    // const location = request.query.search;
    
    lat = cityData.geometry.location.lat;
    lng = cityData.geometry.location.lng;

    respond.json({
        formatted_query: cityData.formatted_address,
        latitude: cityData.geometry.location.lat,
        longitude: cityData.geometry.location.lng, 
    });
});

const getWeatherData = (lat, lng) => {
    return weather.daily.data.map(forecast => {
        return {
            forecast: forecast.summary,
            time: new Date(forecast.time * 1000),
        };
    });
};

app.get('/weather', (req, res) => {
    const portlandWeather = getWeatherData(lat, lng);
    res.json(portlandWeather);
});


app.get('*', (req, res) => res.send('404!!!!!!'));

module.exports = {
    app: app,
};