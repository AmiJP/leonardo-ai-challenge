import { Request, Response } from "express";
import ScheduleController from "../../controllers/scheduleController";
import scheduleService from "../../services/scheduleService";
import { Schedule } from "@prisma/client";
import { randomUUID } from "crypto";

// Mock the scheduleService
jest.mock("../../services/scheduleService");

const mockScheduleService = scheduleService as jest.Mocked<
  typeof scheduleService
>;

describe("ScheduleController", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;
  const scheduleId = randomUUID();
  const mockSchedule: Schedule = {
    id: "1",
    account_id: 1,
    agent_id: 1,
    start_time: new Date(),
    end_time: new Date(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnThis();
    req = {};
    res = {
      status: statusMock,
      json: jsonMock,
      end: jest.fn(),
    };
  });

  describe("getAllSchedules", () => {
    it("should return all schedules with status 200", async () => {
      const mockSchedules = [mockSchedule];
      mockScheduleService.getAllSchedules.mockResolvedValue(mockSchedules);

      await ScheduleController.getAllSchedules(req as Request, res as Response);

      expect(mockScheduleService.getAllSchedules).toHaveBeenCalled();
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(mockSchedules);
    });
  });

  describe("getScheduleById", () => {
    it("should return the schedule with status 200 if found", async () => {
      req.params = { id: scheduleId };
      mockScheduleService.getScheduleById.mockResolvedValue(mockSchedule);
      await ScheduleController.getScheduleById(req as Request, res as Response);

      expect(mockScheduleService.getScheduleById).toHaveBeenCalledWith(
        scheduleId
      );
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(mockSchedule);
    });
  });

  describe("createSchedule", () => {
    it("should create a new schedule with status 201", async () => {
      req.body = mockSchedule;
      mockScheduleService.createSchedule.mockResolvedValue(mockSchedule);

      await ScheduleController.createSchedule(req as Request, res as Response);

      expect(mockScheduleService.createSchedule).toHaveBeenCalledWith(
        mockSchedule
      );
      expect(statusMock).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith(mockSchedule);
    });
  });

  describe("updateSchedule", () => {
    it("should update the schedule with status 200 if found", async () => {
      req.params = { id: scheduleId };
      req.body = mockSchedule;
      mockScheduleService.updateSchedule.mockResolvedValue(mockSchedule);

      await ScheduleController.updateSchedule(req as Request, res as Response);

      expect(mockScheduleService.updateSchedule).toHaveBeenCalledWith(
        scheduleId,
        mockSchedule
      );
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(mockSchedule);
    });
  });

  describe("deleteSchedule", () => {
    it("should delete the schedule with status 204 if found", async () => {
      req.params = { id: scheduleId };
      mockScheduleService.deleteSchedule.mockResolvedValue(undefined as any);

      await ScheduleController.deleteSchedule(req as Request, res as Response);

      expect(mockScheduleService.deleteSchedule).toHaveBeenCalledWith(
        scheduleId
      );
      expect(statusMock).toHaveBeenCalledWith(204);
      expect(res.end).toHaveBeenCalled();
    });
  });
});
