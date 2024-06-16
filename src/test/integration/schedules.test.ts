import request from "supertest";
import app from "../../app";
import { randomUUID } from "crypto";

describe("Schedules", () => {
  const scheduleId = randomUUID();
  const mockSchedule = {
    id: scheduleId,
    account_id: 1,
    agent_id: 1,
    start_time: "2024-06-16T17:08:20.741Z",
    end_time: "2024-06-16T17:08:20.741Z",
  };

  describe("POST /api/schedules", () => {
    it("should create a new schedule", async () => {
      const response = await request(app)
        .post("/api/schedules")
        .send(mockSchedule);
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id");
      expect(response.body.id).toBe(scheduleId);
    });

    it("should return 400 if invalid schedule data is provided", async () => {
      await request(app).post("/api/schedules").send({}).expect(400);

      await request(app)
        .post("/api/schedules")
        .send({ ...mockSchedule, agent_id: "invalid" })
        .expect(400);
    });
  });

  describe("GET /api/schedules", () => {
    it("should get all schedules", async () => {
      // Create a new schedule
      await request(app).post("/api/schedules").send(mockSchedule).expect(201);

      // Get all schedules
      const response = await request(app).get("/api/schedules");
      expect(response.status).toBe(200);
      expect(response.body).toEqual([mockSchedule]);
    });
  });

  describe("GET /api/schedules/:id", () => {
    it("should get a schedule by id", async () => {
      // Create a new schedule
      await request(app).post("/api/schedules").send(mockSchedule).expect(201);

      // Get schedule by id
      const response = await request(app).get(`/api/schedules/${scheduleId}`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockSchedule);
    });

    it("should return 404 if schedule not found", async () => {
      const response = await request(app).get(`/api/schedules/${scheduleId}`);
      expect(response.status).toBe(404);
    });

    it("should return 400 if invalid schedule id", async () => {
      const response = await request(app).get("/api/schedules/invalid-id");
      expect(response.status).toBe(400);
    });
  });

  describe("PUT /api/schedules/:id", () => {
    it("should update a schedule by id", async () => {
      // Create a new schedule
      await request(app).post("/api/schedules").send(mockSchedule).expect(201);

      // Update schedule by id
      const updatedSchedule = { ...mockSchedule, agent_id: 2 };
      const response = await request(app)
        .put(`/api/schedules/${scheduleId}`)
        .send(updatedSchedule);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(updatedSchedule);
    });

    it("should return 400 if invalid schedule id or data is provided", async () => {
      await request(app)
        .put("/api/schedules/invalid-id")
        .send(mockSchedule)
        .expect(400);

      await request(app)
        .put(`/api/schedules/${scheduleId}`)
        .send({ agent_id: "invalid" })
        .expect(400);
    });

    it("should return 404 if schedule not found", async () => {
      const response = await request(app)
        .put(`/api/schedules/${scheduleId}`)
        .send(mockSchedule);
      expect(response.status).toBe(404);
    });
  });

  it("should delete a schedule by id", async () => {
    // Create a new schedule
    await request(app).post("/api/schedules").send(mockSchedule).expect(201);

    // Delete schedule by id
    const response = await request(app).delete(`/api/schedules/${scheduleId}`);
    expect(response.status).toBe(204);
  });

  it("should return 404 if schedule not found", async () => {
    const response = await request(app).delete(`/api/schedules/${scheduleId}`);
    expect(response.status).toBe(404);
  });

  it("should return 400 if invalid schedule id", async () => {
    const response = await request(app).delete("/api/schedules/invalid-id");
    expect(response.status).toBe(400);
  });
});
