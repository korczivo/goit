const supertest = require("supertest");
const db = require("../../db");
const app = require("../../app");
const User = require("../../models/User");

describe("Users controller", () => {
    beforeAll(() => db.connect(process.env.DB_HOST));

    test("create a user", async () => {
        const res = await supertest(app)
            .post("/api/users")
            .send({ email: "test@test.pl", username: "testUserName" })
            .set("Content-Type", "application/json")
            .set("Accept", "application/json");
        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual({ message: "created" });
    });

    test("get a list of users", async () => {
        const res = await supertest(app).get("/api/users");
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(1);
    });

    test("delete users", async () => {
        const res = await supertest(app).delete("/api/users");
        expect(res.statusCode).toEqual(204);
    });

    afterAll(async () => {
        await User.deleteMany({});
        await db.disconnect();
    });
})