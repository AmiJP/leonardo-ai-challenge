import ScheduleService from "../../services/scheduleService";
import scheduleRepository from "../../repositories/scheduleRepository";
import { Schedule } from "@prisma/client";
import { NotFoundError } from "../../errors/notFoundError";
import { randomUUID } from "crypto";

// Mock the scheduleRepository
jest.mock("../../repositories/scheduleRepository");

const mockScheduleRepository = scheduleRepository as jest.Mocked<
  typeof scheduleRepository
>;

describe("ScheduleService", () => {
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
  });

  describe("getAllSchedules", () => {
    it("should return all schedules", async () => {
      const mockSchedules = [mockSchedule];
      mockScheduleRepository.findAll.mockResolvedValue(mockSchedules);

      const schedules = await ScheduleService.getAllSchedules();

      expect(schedules).toEqual(mockSchedules);
      expect(mockScheduleRepository.findAll).toHaveBeenCalled();
    });
  });

  describe("getScheduleById", () => {
    it("should return the schedule if found", async () => {
      mockScheduleRepository.findById.mockResolvedValue(mockSchedule);

      const schedule = await ScheduleService.getScheduleById(scheduleId);

      expect(schedule).toEqual(mockSchedule);
      expect(mockScheduleRepository.findById).toHaveBeenCalledWith(scheduleId);
    });

    it("should throw NotFoundError if the schedule is not found", async () => {
      mockScheduleRepository.findById.mockResolvedValue(null);

      await expect(ScheduleService.getScheduleById(scheduleId)).rejects.toThrow(
        NotFoundError
      );

      expect(mockScheduleRepository.findById).toHaveBeenCalledWith(scheduleId);
    });
  });

  describe("createSchedule", () => {
    it("should create a new schedule", async () => {
      mockScheduleRepository.create.mockResolvedValue(mockSchedule);

      const createdSchedule = await ScheduleService.createSchedule(
        mockSchedule
      );

      expect(createdSchedule).toEqual(mockSchedule);
      expect(mockScheduleRepository.create).toHaveBeenCalledWith(mockSchedule);
    });
  });

  describe("updateSchedule", () => {
    it("should update an existing schedule", async () => {
      mockScheduleRepository.findById.mockResolvedValue(mockSchedule);
      mockScheduleRepository.update.mockResolvedValue(mockSchedule);

      const updatedSchedule = await ScheduleService.updateSchedule(
        scheduleId,
        mockSchedule
      );

      expect(updatedSchedule).toEqual(mockSchedule);
      expect(mockScheduleRepository.findById).toHaveBeenCalledWith(scheduleId);
      expect(mockScheduleRepository.update).toHaveBeenCalledWith(
        scheduleId,
        mockSchedule
      );
    });

    it("should throw NotFoundError if the schedule to update is not found", async () => {
      mockScheduleRepository.findById.mockResolvedValue(null);

      await expect(
        ScheduleService.updateSchedule(scheduleId, mockSchedule)
      ).rejects.toThrow(NotFoundError);
      expect(mockScheduleRepository.findById).toHaveBeenCalledWith(scheduleId);
    });
  });

  describe("deleteSchedule", () => {
    it("should delete an existing schedule", async () => {
      mockScheduleRepository.findById.mockResolvedValue(mockSchedule);
      mockScheduleRepository.remove.mockResolvedValue(mockSchedule);

      const deletedSchedule = await ScheduleService.deleteSchedule(scheduleId);

      expect(deletedSchedule).toEqual(mockSchedule);
      expect(mockScheduleRepository.findById).toHaveBeenCalledWith(scheduleId);
      expect(mockScheduleRepository.remove).toHaveBeenCalledWith(scheduleId);
    });

    it("should throw NotFoundError if the schedule to delete is not found", async () => {
      mockScheduleRepository.findById.mockResolvedValue(null);

      await expect(ScheduleService.deleteSchedule(scheduleId)).rejects.toThrow(
        NotFoundError
      );

      expect(mockScheduleRepository.findById).toHaveBeenCalledWith(scheduleId);
    });
  });
});
