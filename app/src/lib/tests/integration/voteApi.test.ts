import request from "supertest";
import app from "../../app/src/app"; // If you have a Next.js custom server, or mock API routes

describe("POST /api/votes", () => {
  it("should insert a vote and return success", async () => {
    const response = await request(app)
      .post("/api/votes")
      .send({ poll_id: "123", option: "Option A" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("success", true);
  });

  it("should return 400 for missing poll_id", async () => {
    const response = await request(app)
      .post("/api/votes")
      .send({ option: "Option A" });

    expect(response.status).toBe(400);
  });
});

