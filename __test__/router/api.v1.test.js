'use strict';

const { server } = require('../../src/server');


const { db, users, food } = require('../../src/models');
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
    it('GET /api/v1/:model returns a list of :model items', async () => {
        const response = await mockRequest.get('/api/v1/food');
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.text).length).toEqual(0);
    });
});

describe('GET /:model/:id', () => {
    it('GET /api/v1/:model/ID returns a single item by ID.', async () => {
        let response = await mockRequest
        .post('/api/v1/food')
        .send({
            "name": "mansaf",
            "calories": 1000000,
            "type": 'portine'
        });
        response = await mockRequest.get('/api/v1/food/1');
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.text).id).toEqual(1);
    });
});

describe('POST /:model', () => {
    it('POST /api/v1/:model adds an item to the DB and returns an object with the added item.', async () => {
        const response = await mockRequest
        .post('/api/v1/food')
        .send({
            "name": "Mango",
            "calories": 3000,
            "type": 'fruit'
        });
        expect(response.statusCode).toBe(201);
        expect(JSON.parse(response.text).name).toEqual('Mango');
        expect(JSON.parse(response.text).calories).toEqual(3000);
        expect(JSON.parse(response.text).type).toEqual('fruit');
    });
});

describe('PUT /:model/:id', () => {
    it('PUT /api/v1/:model/ID returns a single, updated item by ID', async () => {
        let response = await mockRequest
        .post('/api/v1/food')
        .send({
            "name": "mansaf",
            "calories": 1000000,
            "type": 'portine'
        });
        response = await mockRequest
        .put('/api/v1/food/1')
        .send({
            "name": "mansaf",
            "calories": 1000000,
            "type": 'portine',
            "userId": 1
        });
        expect(response.statusCode).toBe(203);
        expect(JSON.parse(response.text).id).toEqual(1);
    });
});

describe('DELETE /:model/:id', () => {
    it('DELETE /api/v1/:model/ID returns an empty object. Subsequent GET for the same ID should result in nothing found.', async () => {
        const response = await mockRequest.delete('/api/v1/food/1');
        expect(response.statusCode).toBe(204);
    });
});