const request = require("supertest");
const server = require("../api/server");
const db = require("../database/dbConfig");

describe("Authentication", () => {
  describe("login", () => {
    it("Should not return 200 because user is not registered", async done => {
      request(server)
        .post("/api/auth/login")
        .send({ username: "bob", password: "password" })
        .expect(401, done);
    });
    it("Should return json", () => {
      request(server)
        .post("/api/auth/login")
        .send({ username: "jason", password: "password" })
        .expect("Content-Type", /json/);
    });

    describe("Post /register", () => {
      it("should not register user without password", async () => {
        const res = await request(server)
          .post("/api/auth/register")
          .send({ username: "jason" });
        expect(res.status).toBe(500);
        expect(res.type).toBe("text/html");
      });
      it("Should return json", () => {
        request(server)
          .post("/api/auth/register")
          .send({ username: "jason", password: "password" })
          .expect("Content-Type", /json/);
      });
    });
  });
});