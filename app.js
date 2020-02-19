require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const weather = require('./data/darksky.json');
const request = require('superagent');

app.use(cors());

let lat;
let lng;

app.get('/location', async(req, res, next) => {
    try {
        const location = req.query.search;

        const URL = `https://us1.locationiq.com/v1/search.php?key=${process.env.GEOCODE_API_KEY}&q=${location}&format=json`;

        const cityData = await request.get(URL);     

        const firstResult = cityData.body[0];

    
        lat = firstResult.lat;
        lng = firstResult.lon;

        res.json({
            formatted_query: firstResult.display_name,
            latitude: lat,
            longitude: lng,  
        });
    } catch (err) {
        next(err);
    }
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