import request from "supertest";

import app from "../../app";
import { randomUUID } from "crypto";
import scheduleService from "../../services/scheduleService";

// Mock the scheduleService
jest.mock("../../services/scheduleService");

const mockScheduleService = scheduleService as jest.Mocked<
  typeof scheduleService
>;

describe("scheduleRoutes", () => {
  const scheduleId = randomUUID();
  const mockSchedule = {
    id: scheduleId,
    account_id: 1,
    agent_id: 1,
    start_time: "2024-06-16T17:08:20.741Z",
    end_time: "2024-06-16T17:08:20.741Z",
  };

  describe("GET /api/schedules", () => {
    it("should call getAllSchedules", async () => {
      await request(app).get("/api/schedules").expect(200);
      expect(mockScheduleService.getAllSchedules).toHaveBeenCalled();
    });
  });

  describe("GET /api/schedules/:id", () => {
    it("should call getScheduleById with validation", async () => {
      await request(app).get(`/api/schedules/${scheduleId}`).expect(200);
      expect(mockScheduleService.getScheduleById).toHaveBeenCalledWith(
        scheduleId
      );
    });

    it("should return 400 if invalid schedule ID is provided", async () => {
      await request(app).get(`/api/schedules/invalid`).expect(400);
    });
  });

  describe("POST /api/schedules", () => {
    it("should call createSchedule with validation", async () => {
      await request(app).post("/api/schedules").send(mockSchedule).expect(201);
      expect(mockScheduleService.createSchedule).toHaveBeenCalledWith(
        mockSchedule
      );
    });

    it("should return 400 if invalid schedule data is provided", async () => {
      await request(app).post("/api/schedules").send({}).expect(400);
    });
  });

  describe("PUT /api/schedules/:id", () => {
    it("should call updateSchedule with validation", async () => {
      await request(app)
        .put(`/api/schedules/${scheduleId}`)
        .send({})
        .expect(200);
      expect(mockScheduleService.updateSchedule).toHaveBeenCalledWith(
        scheduleId,
        {}
      );
    });

    it("should return 400 if invalid schedule ID or data is provided", async () => {
      await request(app).put(`/api/schedules/invalid`).send({}).expect(400);

      await request(app)
        .put(`/api/schedules/${scheduleId}`)
        .send({ agent_id: "invalid" })
        .expect(400);
    });

    describe("DELETE /api/schedules/:id", () => {
      it("should call deleteSchedule with validation", async () => {
        await request(app).delete(`/api/schedules/${scheduleId}`).expect(204);
        expect(mockScheduleService.deleteSchedule).toHaveBeenCalledWith(
          scheduleId
        );
      });

      it("should return 400 if invalid schedule ID is provided", async () => {
        await request(app).delete(`/api/schedules/invalid`).expect(400);
      });
    });
  });
});
