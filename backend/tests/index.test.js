const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../index");

jest.mock("web3");

describe("POST /login", () => {
  it("responds with json", async () => {
    const response = await request(app)
      .post("/login")
      .send({ address: "0x123" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    expect(response.body).toHaveProperty("accessToken");
  });
});

describe("GET /proposals", () => {
  it("responds with 403 if token is invalid", async () => {
    const token = jwt.sign({ address: "0x123" }, "invalidsecret");
    await request(app)
      .get("/proposals")
      .set("Authorization", `Bearer ${token}`)
      .expect(403);
  });

  it("responds with 401 if token is not provided", async () => {
    await request(app).get("/proposals").expect(401);
  });

  it("responds with 200 and an array of proposals if token is valid", async () => {
    const token = jwt.sign({ address: "0x123" }, "passphrase");

    const response = await request(app)
      .get("/proposals")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe("POST /proposals", () => {
  it("responds with 201 if token is valid and proposal data is provided", async () => {
    const token = jwt.sign({ address: "0x123" }, "passphrase");

    const response = await request(app)
      .post("/proposals")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Test Proposal", description: "This is a test proposal" })
      .expect(201);

    expect(response.text).toBe("Proposal submitted successfully");
  });

  it("responds with 500 if token is valid but proposal data is not provided", async () => {
    const token = jwt.sign({ address: "0x123" }, "passphrase");

    const response = await request(app)
      .post("/proposals")
      .set("Authorization", `Bearer ${token}`)
      .send({})
      .expect(500);
  });
});

describe("POST /proposals/:id/vote", () => {
  it("responds with 200 if token is valid and vote data is provided", async () => {
    const token = jwt.sign({ address: "0x123" }, "passphrase");

    const response = await request(app)
      .post("/proposals/1/vote")
      .set("Authorization", `Bearer ${token}`)
      .send({ isYesVote: true })
      .expect(200);

    expect(response.text).toBe("Vote submitted successfully");
  });
});
