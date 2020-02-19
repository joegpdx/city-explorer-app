const express = require('express');
const app = express();

const geoData = require('./data/geo.json');

app.get('/location', (request, respond) => {
    const cityData = geoData.results[0];

    respond.json({
        formatted_query: cityData.formatted_address,
        latitude: cityData.geometry.location.lat,
        longitude: cityData.geometry.location.lng, 
    });
});


app.get('*', (req, res) => res.send('404!!!!!!'));

module.exports = {
    app: app,
};