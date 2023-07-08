'use strict';

process.env.SECRET = "TEST_SECRET";

const { server } = require('../../src/server');


const { db, users } = require('../../src/models');
const supertest = require('supertest');
const mockRequest = supertest(server);


beforeAll(async connected => {
    await db.sync();
    await users.create({ username: 'osama', password: '123', role: 'admin' });
    connected();
  });
  
  afterAll(async done => {
    await db.drop();
    done();
  })


describe('POST  /signup', () => {
    it('POST /signup creates a new user and sends an object with the user and the token to the client', async () => {
        const response = await mockRequest
            .post('/signup')
            .send({
                "username": "sham",
                "password": "123",
                "role": "admin"
            });
        expect(response.statusCode).toBe(201);
        expect(JSON.parse(response.text).user).toHaveProperty('token');
    });
});

describe('POST to /signin to login as a user (use basic auth)', () => {
    it('POST /signin with basic authentication headers logs in a user and sends an object with the user and the token to the client', async () => {
        const response = await mockRequest
            .post('/signin')
            .set('Authorization', 'Basic ' + Buffer.from('sham:123').toString('base64'));
        expect(response.status).toBe(200);
    });

    it('should return a 403 status code when an invalid username or password is provided', async () => {
        const response = await mockRequest
            .post('/signin')
            .set('Authorization', 'Basic ' + Buffer.from('invalidusername:invalidpassword').toString('base64'));
        expect(response.status).toBe(403);
    });

    it.skip('should return a JSON object with the user data when a valid username and password are provided', async () => {
        const response = await mockRequest
            .post('/signin')
            .set('Authorization', 'Basic ' + Buffer.from('ymym:123').toString('base64'));
        expect(JSON.parse(response.text)).toHaveProperty('user');
    });

    it('should exist and accept POST mockRequestuests', async () => {
        const response = await mockRequest.post('/signin');
        expect(response.status).not.toBe(404);
    });
});



