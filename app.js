require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
// const weather = require('./data/darksky.json');
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

const getWeatherData = async(lat, lng) => {
    const weather = await request.get(`https://api.darksky.net/forecast/${process.env.WEATHER_API_KEY}/${lat},${lng}`);
    return weather.body.daily.data.map(forecast => {
        return {
            forecast: forecast.summary,
            time: new Date(forecast.time * 1000),
        };
    });
};

app.get('/weather', async(req, res, next) => {
    try {
        const portlandWeather = await getWeatherData(lat, lng);
        res.json(portlandWeather);
    } catch (err) {
        next(err);
    }
});

const getEventData = async(lat, lng) => {
    const eventsData = await request.get (`http://api.eventful.com/json/events/search?app_key=${process.env.EVENTFUL_API_KEY}&where=${lat},${lng}&within=25&page_size=20&page_number=1`);
    
    const nearbyEvents = JSON.parse(eventsData.text);
    return nearbyEvents.events.event.map(events => {
        return {
            link: events.url,
            name: events.title,
            event_date: events.end_time,
            summary: events.description
        };
    });
};

app.get('/events', async(req, res, next) => {
    try {
        const portlandEvents = await getEventData(lat, lng);
        res.json(portlandEvents);
    } catch (err) {
        next(err);
    }
});

app.get('/reviews', async(req, res) => {
    try {
        const yelp = await request.get(`https://api.yelp.com/v3/businesses/search?term=restaurants&latitude=${lat}&longitude=${lng}`).set('Authorization', `Bearer ${process.env.YELP_API_KEY}`);
        const yelpStuff = yelp.body.businesses.map(business =>{
            return {
                name: business.name,
                image: business.image_url,
                price: business.price,
                rating: business.rating,
                url: business.url
            };
        });
        res.json(yelpStuff);
    } catch (err) {
        res.status(500).send('Sorry something went wrong, please try again');
    }
});

app.get('/trails', async(req, res) => {
    try {
        const trailsData = await request.get(`https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${lng}&maxDistance=10&key=${process.env.TRAIL_API_KEY}`);

        const trails = trailsData.body.trails.map(trails =>{
            return {
                name: trails.name,
                location: trails.location,
                length: trails.length,
                stars: trails.stars,
                starVotes: trails.starVotes,
                summary: trails.summary,
                url: trails.url,
                conditionDate: Date(trails.conditionDatenew * 1000)
            };
        });
        res.json(trails);
    } catch (err) {
        res.status(500).send('Sorry something went wrong, please try again');
    }
});


app.get('*', (req, res) => res.send('404!!!!!!'));

module.exports = {
    app: app,
};