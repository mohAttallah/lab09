'use strict';

process.env.SECRET = "TEST_SECRET";

const { server } = require('../../src/server');


const { db, users } = require('../../src/models');
const supertest = require('supertest');
const mockRequest = supertest(server);


beforeAll(async () => {
    await db.sync();
});

afterAll(async () => {
    await db.drop();
});


describe('POST  /signup', () => {
    it('should return a 200 status code', async () => {
        const response = await mockRequest.get('/api/v1/food');
        expect(response.statusCode).toBe(200);
    });

    it('should return a 201 status code', async () => {
        const response = await mockRequest
            .post('/signup')
            .send({
                "username": "ymym",
                "password": "123",
                "age": 22,
                "email": "somethb",
                "role": "regular"
            });
        expect(response.statusCode).toBe(201);
    });
});

describe('POST to /signin to login as a user (use basic auth)', () => {
    it('should return a 200 status code when a valid username and password are provided', async () => {
        const response = await mockRequest
            .post('/signin')
            .set('Authorization', 'Basic ' + Buffer.from('ymym:123').toString('base64'));
        expect(response.status).toBe(200);
    });

    it('should return a 403 status code when an invalid username or password is provided', async () => {
        const response = await mockRequest
            .post('/signin')
            .set('Authorization', 'Basic ' + Buffer.from('invalidusername:invalidpassword').toString('base64'));
        expect(response.status).toBe(403);
    });

    it('should return a JSON object with the user data when a valid username and password are provided', async () => {
        const response = await mockRequest
            .post('/signin')
            .set('Authorization', 'Basic ' + Buffer.from('ymym:123').toString('base64'));
        expect(response.body).toHaveProperty('user');
    });

    it('should exist and accept POST mockRequestuests', async () => {
        const response = await mockRequest.post('/signin');
        expect(response.status).not.toBe(404);
    });
});



