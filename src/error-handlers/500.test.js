'use strict';

require('dotenv').config();
const { server } = require("../server");
const supertest = require("supertest");
const req = supertest(server);

describe('server error', () => {
    it('Handle not foound page method', async () => {
        const res = await req.get('/intentionalError');
        expect(res.status).toEqual(500);
    });
});
