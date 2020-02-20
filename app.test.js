const { app } = require('./app.js');
const request = require('supertest');

// we will use supertest to test HTTP requests/responses
// we also need our app for the correct routes!

describe('GET / ', () => {
    test('It should respond with correctly formatted data', async(done) => {
        const response = await request(app)
            .get('/location?search=portland');

        expect(response.body).toEqual({
            formatted_query: expect.any(String),
            latitude: expect.any(String),
            longitude: expect.any(String),
        });
        expect(response.statusCode).toBe(200);

        done();
    });
});

describe('GET / ', () => {
    test('It should respond with correctly formatted data', async(done) => {
        const response = await request(app)
            .get('/weather');
            

        expect(response.body[0]).toEqual({
            forecast: expect.any(String),
            time: expect.any(String),
        });
        expect(response.statusCode).toBe(200);

        done();
    });
});

describe('GET / ', () => {
    test('It should respond with correctly formatted data', async(done) => {
        const response = await request(app)
            .get('/events');

        expect(response.body[0]).toEqual({
            link: expect.any(String),
            name: expect.any(String),
            summary: null
        });
        expect(response.statusCode).toBe(200);

        done();
    });
});
describe('GET / ', () => {
    test('It should respond with correctly formatted data', async(done) => {
        const response = await request(app)
            .get('/reviews');

        expect(response.body[0]).toEqual({
            name: expect.any(String),
            image: expect.any(String),
            price: expect.any(String),
            rating: expect.any(Number),
            url: expect.any(String)
        });
        expect(response.statusCode).toBe(200);

        done();
    });
});
describe('GET / ', () => {
    test('It should respond with correctly formatted data', async(done) => {
        const response = await request(app)
            .get('/trails');

        expect(response.body[0]).toEqual({
            name: expect.any(String),
            location: expect.any(String),
            length: expect.any(Number),
            stars: expect.any(Number),
            starVotes: expect.any(Number),
            summary: expect.any(String),
            url: expect.any(String),
            conditionDate: expect.any(String)
        });
        expect(response.statusCode).toBe(200);

        done();
    });
});