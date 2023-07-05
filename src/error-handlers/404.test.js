'use strict';

require('dotenv').config();
const { server } = require("../server");
const supertest = require("supertest");
const req = supertest(server);


describe("Server test", () => {
    it("Route not found", async () => {
        const res = await req.get("/new");
        expect(res.status).toEqual(404);
    });

    it("Route not found", async () => {
        const res = await req.put("/new");
        expect(res.status).toEqual(404);
    });
});

