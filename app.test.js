const { app } = require('./app.js');
const request = require('supertest');

// we will use supertest to test HTTP requests/responses
// we also need our app for the correct routes!

describe('GET / ', () => {
    test('It should respond with correctly formatted data', async(done) => {
        const response = await request(app)
            .get('/location');

        expect(response.body).toEqual({
            formatted_query: 'undefined, Boeny, Province de Mahajanga, Madagascar',
            latitude: "-15.8211274",
            longitude: "46.6999841",
        });
        expect(response.statusCode).toBe(200);

        done();
    });
});