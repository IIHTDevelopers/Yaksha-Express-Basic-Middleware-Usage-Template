// tests/app.test.js
const request = require('supertest');
const app = require('../app'); // Import the Express app

let appBoundaryTest = `AppController boundary test`;

describe('App Controller', () => {
    describe('boundary', () => {
        it(`${appBoundaryTest} should log the correct request details (method, URL, timestamp)`, async () => {
            // Mock console.log to capture logs
            console.log = jest.fn();

            // Make a GET request to the root route
            await request(app).get('/');

            // Check if console.log was called with the correct details
            expect(console.log).toHaveBeenCalledWith(expect.stringContaining('GET / at'));
        });

        it(`${appBoundaryTest} should add the X-Powered-By header in the response`, async () => {
            const response = await request(app).get('/');

            // Check if the response contains the custom header
            expect(response.headers['x-powered-by']).toBe('Express');
        });

        it(`${appBoundaryTest} should measure request time and log the duration`, async () => {
            // Mock console.log to capture logs
            console.log = jest.fn();

            // Make a GET request to the '/about' route
            await request(app).get('/about');

            // Check if the time measurement middleware logged the duration
            expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Request took'));
        });

        it(`${appBoundaryTest} should correctly process the /about route`, async () => {
            const response = await request(app).get('/about');

            // Check if the response is as expected
            expect(response.status).toBe(200);
            expect(response.text).toBe('About us');
        });

        it(`${appBoundaryTest} should correctly process the / route`, async () => {
            const response = await request(app).get('/');

            // Check if the response is as expected
            expect(response.status).toBe(200);
            expect(response.text).toBe('Hello, World!');
        });
    });
});
