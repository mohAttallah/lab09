'use strict';

const { server } = require('../../src/server');
// Server containe the app from the server.js
require('dotenv').config();

const { db, users } = require('../../src/models');
const jwt = require('jsonwebtoken');
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


describe('GET /secret', () => {
    const token = jwt.sign({ username: 'osama' }, process.env.SECRET);
    it('should return a 200 status code', async () => {
        const response = await mockRequest.get('/secret').set({ authorization: `Bearer ${token}` });
        expect(response.statusCode).toBe(200);
        expect(response.text).toEqual('Welcome to the secret area')
    });
});

