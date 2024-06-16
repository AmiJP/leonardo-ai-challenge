import TaskService from "../../services/taskService";
import taskRepository from "../../repositories/taskRepository";
import scheduleRepository from "../../repositories/scheduleRepository";
import { Task } from "@prisma/client";
import { NotFoundError } from "../../errors/notFoundError";
import { randomUUID } from "crypto";

// Mock the repositories
jest.mock("../../repositories/taskRepository");
jest.mock("../../repositories/scheduleRepository");

const mockTaskRepository = taskRepository as jest.Mocked<typeof taskRepository>;
const mockScheduleRepository = scheduleRepository as jest.Mocked<
  typeof scheduleRepository
>;

describe("TaskService", () => {
  const scheduleId = randomUUID();
  const taskId = randomUUID();
  const mockSchedule = {
    id: scheduleId,
    account_id: 1,
    agent_id: 1,
    start_time: new Date(),
    end_time: new Date(),
  };
  const mockTask: Task = {
    id: taskId,
    account_id: 1,
    schedule_id: scheduleId,
    start_time: new Date(),
    duration: 60,
    type: "work",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getTasksByScheduleId", () => {
    it("should return tasks for a given schedule ID", async () => {
      const mockTasks = [mockTask];
      mockScheduleRepository.findById.mockResolvedValue(mockSchedule);
      mockTaskRepository.findAllByScheduleId.mockResolvedValue(mockTasks);

      const tasks = await TaskService.getTasksByScheduleId(scheduleId);

      expect(tasks).toEqual(mockTasks);
      expect(mockTaskRepository.findAllByScheduleId).toHaveBeenCalledWith(
        scheduleId
      );
    });
  });

  describe("getTaskById", () => {
    it("should return the task if found", async () => {
      mockTaskRepository.findById.mockResolvedValue(mockTask);

      const task = await TaskService.getTaskById(taskId);

      expect(task).toEqual(mockTask);
      expect(mockTaskRepository.findById).toHaveBeenCalledWith(taskId);
    });

    it("should throw NotFoundError if the task is not found", async () => {
      mockTaskRepository.findById.mockResolvedValue(null);

      await expect(TaskService.getTaskById(taskId)).rejects.toThrow(
        NotFoundError
      );

      expect(mockTaskRepository.findById).toHaveBeenCalledWith(taskId);
    });
  });

  describe("createTask", () => {
    it("should create a new task if the schedule exists", async () => {
      mockScheduleRepository.findById.mockResolvedValue({
        id: scheduleId,
      } as any);
      mockTaskRepository.create.mockResolvedValue(mockTask);

      const createdTask = await TaskService.createTask(mockTask);

      expect(createdTask).toEqual(mockTask);
      expect(mockScheduleRepository.findById).toHaveBeenCalledWith(scheduleId);
      expect(mockTaskRepository.create).toHaveBeenCalledWith(mockTask);
    });

    it("should throw NotFoundError if the schedule does not exist", async () => {
      mockScheduleRepository.findById.mockResolvedValue(null);

      await expect(TaskService.createTask(mockTask)).rejects.toThrow(
        NotFoundError
      );

      expect(mockScheduleRepository.findById).toHaveBeenCalledWith(scheduleId);
    });
  });

  describe("updateTask", () => {
    it("should update an existing task if found", async () => {
      mockScheduleRepository.findById.mockResolvedValue({
        id: scheduleId,
      } as any);
      mockTaskRepository.findById.mockResolvedValue(mockTask);
      mockTaskRepository.update.mockResolvedValue(mockTask);

      const updatedTask = await TaskService.updateTask(taskId, mockTask);

      expect(updatedTask).toEqual(mockTask);
      expect(mockTaskRepository.findById).toHaveBeenCalledWith(taskId);
      expect(mockTaskRepository.update).toHaveBeenCalledWith(taskId, mockTask);
    });

    it("should throw NotFoundError if the task to update is not found", async () => {
      mockTaskRepository.findById.mockResolvedValue(null);

      await expect(TaskService.updateTask(taskId, mockTask)).rejects.toThrow(
        NotFoundError
      );

      expect(mockTaskRepository.findById).toHaveBeenCalledWith(taskId);
    });

    it("should throw NotFoundError if the new schedule does not exist", async () => {
      mockTaskRepository.findById.mockResolvedValue(mockTask);
      mockScheduleRepository.findById.mockResolvedValue(null);

      await expect(TaskService.updateTask(taskId, mockTask)).rejects.toThrow(
        NotFoundError
      );

      expect(mockTaskRepository.findById).toHaveBeenCalledWith(taskId);
      expect(mockScheduleRepository.findById).toHaveBeenCalledWith(scheduleId);
    });
  });

  describe("deleteTask", () => {
    it("should delete an existing task if found", async () => {
      mockTaskRepository.findById.mockResolvedValue(mockTask);
      mockTaskRepository.remove.mockResolvedValue(mockTask);

      const deletedTask = await TaskService.deleteTask(taskId);

      expect(deletedTask).toEqual(mockTask);
      expect(mockTaskRepository.findById).toHaveBeenCalledWith(taskId);
      expect(mockTaskRepository.remove).toHaveBeenCalledWith(taskId);
    });

    it("should throw NotFoundError if the task to delete is not found", async () => {
      mockTaskRepository.findById.mockResolvedValue(null);

      await expect(TaskService.deleteTask(taskId)).rejects.toThrow(
        NotFoundError
      );

      expect(mockTaskRepository.findById).toHaveBeenCalledWith(taskId);
    });
  });
});
