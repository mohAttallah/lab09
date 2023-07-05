'use strict';

const { server } = require('../src/server');
// Server containe the app from the server.js
require('dotenv').config();

const { db, users } = require('../src/models');
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

describe('Routes vs test', () => {
  const token = jwt.sign({ username: 'osama' }, process.env.SECRET);

  it(' create a record ', async () => {
    const data = {
      name: 'mansaf',
      calories: 1000,
      type: 'protein',
      "userId":1
    }

    const response = await mockRequest.post('/api/v2/food')
      .set({ authorization: `Bearer ${token}` })
      .send(data);

    expect(response.status).toBe(201);
    expect(response.body.id).toBeDefined();
  });

  it('get list of records', async () => {
    const response = await mockRequest.get('/api/v2/food')
      .set({ authorization: `Bearer ${token}` });
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  })

  it(' return a 200 status code', async () => {
    const response = await mockRequest.get('/api/v2/food/1')
      .set({ authorization: `Bearer ${token}` });
    expect(response.statusCode).toBe(200);
  });


  it('return a 201 status code', async () => {
    const response = await mockRequest
      .post('/api/v2/food').set({ authorization: `Bearer ${token}` })
      .send({
        "name": "mansaf",
        "calories": 1000000,
        "type": 'portine',
        "userId": 1
      });
    expect(response.statusCode).toBe(201);
  });
  it('return a 203 status code', async () => {
    const response = await mockRequest
      .put('/api/v2/food/1').set({ authorization: `Bearer ${token}` })
      .send({
        "name": "mansaf",
        "calories": 1000000,
        "type": 'portine',
        "userId": 1
      })
    expect(response.statusCode).toBe(203);
  })
  it('return a 204 status code', async () => {
    const response = await mockRequest.delete('/api/v2/food/1').set({ authorization: `Bearer ${token}` })
    expect(response.statusCode).toBe(204);
  });
  it.skip('should return a 200 status code', async () => {
    const response = await mockRequest.get('api/v1/food/userOrder/2').set({ authorization: `Bearer ${token}` });
    expect(response.statusCode).toBe(200);
  });

})

