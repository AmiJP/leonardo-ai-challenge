import request from "supertest";

import app from "../../app";
import { randomUUID } from "crypto";
import taskService from "../../services/taskService";

// Mock the taskService
jest.mock("../../services/taskService");

const mockTaskService = taskService as jest.Mocked<typeof taskService>;

describe("taskRoutes", () => {
  const taskId = randomUUID();
  const scheduleId = randomUUID();
  const mockTask = {
    id: taskId,
    account_id: 1,
    schedule_id: scheduleId,
    start_time: "2024-06-16T17:08:20.741Z",
    duration: 60,
    type: "work",
  };

  describe("GET /api/tasks", () => {
    it("should call getTasksByScheduleId", async () => {
      await request(app).get(`/api/tasks/schedule/${scheduleId}`).expect(200);
      expect(mockTaskService.getTasksByScheduleId).toHaveBeenCalledWith(
        scheduleId
      );
    });

    it("should return 400 if invalid schedule ID is provided", async () => {
      await request(app).get(`/api/tasks/schedule/invalid`).expect(400);
    });
  });

  describe("GET /api/tasks/:id", () => {
    it("should call getTaskById with validation", async () => {
      await request(app).get(`/api/tasks/${taskId}`).expect(200);
      expect(mockTaskService.getTaskById).toHaveBeenCalledWith(taskId);
    });

    it("should return 400 if invalid task ID is provided", async () => {
      await request(app).get(`/api/tasks/invalid`).expect(400);
    });
  });

  describe("POST /api/tasks", () => {
    it("should call createTask with validation", async () => {
      await request(app).post("/api/tasks").send(mockTask).expect(201);

      expect(mockTaskService.createTask).toHaveBeenCalledWith(mockTask);
    });

    it("should return 400 if invalid task ID or data is provided", async () => {
      await request(app).post("/api/tasks").send({}).expect(400);

      await request(app)
        .post("/api/tasks")
        .send({ ...mockTask, schedule_id: "invalid" })
        .expect(400);
    });
  });

  describe("PUT /api/tasks/:id", () => {
    it("should call updateTask with validation", async () => {
      await request(app).put(`/api/tasks/${taskId}`).send({}).expect(200);
      expect(mockTaskService.updateTask).toHaveBeenCalledWith(taskId, {});
    });

    it("should return 400 if invalid task ID or data is provided", async () => {
      await request(app).put(`/api/tasks/invalid`).send({}).expect(400);

      await request(app)
        .put(`/api/tasks/${taskId}`)
        .send({ schedule_id: "invalid" })
        .expect(400);
    });
  });

  describe("DELETE /api/tasks/:id", () => {
    it("should call deleteTask with validation", async () => {
      await request(app).delete(`/api/tasks/${taskId}`).expect(204);
      expect(mockTaskService.deleteTask).toHaveBeenCalledWith(taskId);
    });

    it("should return 400 if invalid task ID is provided", async () => {
      await request(app).delete(`/api/tasks/invalid`).expect(400);
    });
  });
});
