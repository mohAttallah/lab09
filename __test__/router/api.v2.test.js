'use strict';

const { server } = require('../../src/server');
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

describe('Routes v2 test', () => {
  const token = jwt.sign({ username: 'osama' }, process.env.SECRET|| '2000');

  it('POST /api/v2/:model with a bearer token that has create permissions adds an item to the DB and returns an object with the added item.', async () => {
    const data = {
      "name": "Mango",
      "calories": 3000,
      "type": 'fruit'
    }

    const response = await mockRequest.post('/api/v2/food')
      .set({ authorization: `Bearer ${token}` })
      .send(data);

    expect(response.status).toBe(201);
    expect(JSON.parse(response.text).name).toEqual('Mango');
    expect(JSON.parse(response.text).calories).toEqual(3000);
    expect(JSON.parse(response.text).type).toEqual('fruit');
  });

  it('GET /api/v2/:model with a bearer token that has read permissions returns a list of :model items.', async () => {
    const response = await mockRequest.get('/api/v2/food')
      .set({ authorization: `Bearer ${token}` });
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  })

  it('GET /api/v2/:model/ID with a bearer token that has read permissions returns a single item by ID.', async () => {
    const data = {
      "name": "Mango",
      "calories": 3000,
      "type": 'fruit'
    }

    let response = await mockRequest.post('/api/v2/food')
      .set({ authorization: `Bearer ${token}` })
      .send(data);
    
    response = await mockRequest.get('/api/v2/food/1')
      .set({ authorization: `Bearer ${token}` });
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.text).id).toEqual(1);
  });

  it('PUT /api/v2/:model/ID with a bearer token that has update permissions returns a single, updated item by ID.', async () => {
    const data = {
      "name": "Mango",
      "calories": 3000,
      "type": 'fruit'
    }

    let response = await mockRequest.post('/api/v2/food')
      .set({ authorization: `Bearer ${token}` })
      .send(data);

    response = await mockRequest
      .put('/api/v2/food/1').set({ authorization: `Bearer ${token}` })
      .send({
        "name": "Apple",
        "calories": 2000,
        "type": 'fruit'
      })
    expect(response.statusCode).toBe(203);
    expect(JSON.parse(response.text).name).toEqual('Apple');
    expect(JSON.parse(response.text).calories).toEqual(2000);
    expect(JSON.parse(response.text).type).toEqual('fruit');
  })
  it('DELETE /api/v2/:model/ID with a bearer token that has delete permissions returns an empty object. Subsequent GET for the same ID should result in nothing found.', async () => {
    const response = await mockRequest.delete('/api/v2/food/1').set({ authorization: `Bearer ${token}` })
    expect(response.statusCode).toBe(204);
  });
})

