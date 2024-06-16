import request from "supertest";
import app from "../../app";
import { randomUUID } from "crypto";

describe("Task", () => {
  const taskId = randomUUID();
  const scheduleId = randomUUID();
  const mockSchedule = {
    id: scheduleId,
    account_id: 1,
    agent_id: 1,
    start_time: "2024-06-16T17:08:20.741Z",
    end_time: "2024-06-16T17:08:20.741Z",
  };
  const mockTask = {
    id: taskId,
    account_id: 1,
    schedule_id: scheduleId,
    start_time: "2024-06-16T17:08:20.741Z",
    duration: 60,
    type: "work",
  };

  describe("POST /api/tasks", () => {
    it("should create a new task", async () => {
      // create a schedule
      await request(app).post("/api/schedules").send(mockSchedule).expect(201);

      const response = await request(app).post("/api/tasks").send(mockTask);
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id");
      expect(response.body.id).toBe(taskId);
    });

    it("should return 400 if invalid task data is provided", async () => {
      await request(app).post("/api/tasks").send({}).expect(400);

      await request(app)
        .post("/api/tasks")
        .send({ ...mockTask, schedule_id: "invalid" })
        .expect(400);
    });
  });

  describe("GET /api/tasks/schedule/:id", () => {
    it("should get all tasks for a schedule", async () => {
      // Create a new schedule
      await request(app).post("/api/schedules").send(mockSchedule).expect(201);
      // Create a new task
      await request(app).post("/api/tasks").send(mockTask).expect(201);

      // Get all tasks
      const response = await request(app).get(
        `/api/tasks/schedule/${scheduleId}`
      );
      expect(response.status).toBe(200);
      expect(response.body).toEqual([mockTask]);
    });

    it("should return 404 if schedule not found", async () => {
      const response = await request(app).get(
        `/api/tasks/schedule/${randomUUID()}`
      );
      expect(response.status).toBe(404);
    });

    it("should return 400 if invalid schedule id", async () => {
      const response = await request(app).get("/api/tasks/schedule/invalid-id");
      expect(response.status).toBe(400);
    });
  });

  describe("GET /api/tasks/:id", () => {
    it("should get a task by id", async () => {
      // Create a new schedule
      await request(app).post("/api/schedules").send(mockSchedule).expect(201);
      // Create a new task
      await request(app).post("/api/tasks").send(mockTask).expect(201);

      // Get task by id
      const response = await request(app).get(`/api/tasks/${taskId}`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockTask);
    });

    it("should return 404 if task not found", async () => {
      const response = await request(app).get(`/api/tasks/${taskId}`);
      expect(response.status).toBe(404);
    });

    it("should return 400 if invalid task id", async () => {
      const response = await request(app).get("/api/tasks/invalid-id");
      expect(response.status).toBe(400);
    });
  });

  describe("PUT /api/tasks/:id", () => {
    it("should update a task by id", async () => {
      // Create a new schedule
      await request(app).post("/api/schedules").send(mockSchedule).expect(201);
      // Create a new task
      await request(app).post("/api/tasks").send(mockTask).expect(201);

      const updatedTask = {
        ...mockTask,
        duration: 120,
      };

      // Update task by id
      const response = await request(app)
        .put(`/api/tasks/${taskId}`)
        .send(updatedTask);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(updatedTask);
    });

    it("should return 404 if task not found", async () => {
      const response = await request(app)
        .put(`/api/tasks/${taskId}`)
        .send(mockTask);
      expect(response.status).toBe(404);
    });

    it("should return 400 if invalid task id or data is provided", async () => {
      await request(app).put("/api/tasks/invalid-id").send({}).expect(400);

      await request(app)
        .put(`/api/tasks/${taskId}`)
        .send({ ...mockTask, schedule_id: "invalid" })
        .expect(400);
    });
  });

  describe("DELETE /api/tasks/:id", () => {
    it("should delete a task by id", async () => {
      // Create a new schedule
      await request(app).post("/api/schedules").send(mockSchedule).expect(201);
      // Create a new task
      await request(app).post("/api/tasks").send(mockTask).expect(201);

      // Delete task by id
      const response = await request(app).delete(`/api/tasks/${taskId}`);
      expect(response.status).toBe(204);
    });

    it("should return 404 if task not found", async () => {
      const response = await request(app).delete(`/api/tasks/${taskId}`);
      expect(response.status).toBe(404);
    });

    it("should return 400 if invalid task id", async () => {
      const response = await request(app).delete("/api/tasks/invalid-id");
      expect(response.status).toBe(400);
    });
  });
});
