'use strict';

const { server } = require('../src/server');


const { db, users, food } = require('../src/models');
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



describe('GET /:model', () => {
    it('should return a 200 status code', async () => {
        const response = await mockRequest.get('/api/v1/food');
        expect(response.statusCode).toBe(200);
    });
});

describe('GET /:model/:id', () => {
    it('should return a 200 status code', async () => {
        const response = await mockRequest.get('/api/v1/food/1');
        expect(response.statusCode).toBe(200);
    });
});

describe('POST /:model', () => {
    it('should return a 201 status code', async () => {
        const response = await mockRequest
            .post('/api/v1/food')
            .send({
                "name": "mansaf",
                "calories": 1000000,
                "type": 'portine',
                "userId": 1
            });
        expect(response.statusCode).toBe(201);
    });
});

describe('PUT /:model/:id', () => {
    it('should return a 203 status code', async () => {
        const response = await mockRequest
            .put('/api/v1/food/1')
            .send({
                "name": "mansaf",
                "calories": 1000000,
                "type": 'portine',
                "userId": 1
            });
        expect(response.statusCode).toBe(203);
    });
});

describe('DELETE /:model/:id', () => {
    it('should return a 204 status code', async () => {
        const response = await mockRequest.delete('/api/v1/food/1');
        expect(response.statusCode).toBe(204);
    });
});


describe.skip('GET /:model/userOrder/:id', () => {
    console.log("==================================")
    console.log(users);
    it.skip('should return a 200 status code', async () => {
        const response = await mockRequest.get('api/v1/food/userOrder/2');
        expect(response.statusCode).toBe(200);
    });
});