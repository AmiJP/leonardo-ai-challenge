import { Request, Response } from "express";
import taskController from "../taskController";
import taskService from "../../services/taskService";
import { Task } from "@prisma/client";
import { randomUUID } from "crypto";

// Mock the taskService
jest.mock("../../services/taskService");

const mockTaskService = taskService as jest.Mocked<typeof taskService>;

describe("TaskController", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;
  let endMock: jest.Mock;
  const scheduleId = randomUUID();
  const taskId = randomUUID();
  const mockTask: Task = {
    id: "1",
    account_id: 1,
    schedule_id: "123",
    start_time: new Date(),
    duration: 60,
    type: "work",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnThis();
    endMock = jest.fn();
    req = {};
    res = {
      status: statusMock,
      json: jsonMock,
      end: endMock,
    };
  });

  describe("getTasksByschedule_id", () => {
    it("should return tasks with status 200", async () => {
      const mockTasks = [mockTask];
      req.params = { scheduleId: scheduleId };
      mockTaskService.getTasksByScheduleId.mockResolvedValue(mockTasks);

      await taskController.getTasksByScheduleId(
        req as Request,
        res as Response
      );

      expect(mockTaskService.getTasksByScheduleId).toHaveBeenCalledWith(
        scheduleId
      );
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(mockTasks);
    });
  });

  describe("getTaskById", () => {
    it("should return the task with status 200", async () => {
      req.params = { id: taskId };
      mockTaskService.getTaskById.mockResolvedValue(mockTask);

      await taskController.getTaskById(req as Request, res as Response);

      expect(mockTaskService.getTaskById).toHaveBeenCalledWith(taskId);
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(mockTask);
    });
  });

  describe("createTask", () => {
    it("should create a new task with status 201", async () => {
      req.body = mockTask;
      mockTaskService.createTask.mockResolvedValue(mockTask);

      await taskController.createTask(req as Request, res as Response);

      expect(mockTaskService.createTask).toHaveBeenCalledWith(mockTask);
      expect(statusMock).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith(mockTask);
    });
  });

  describe("updateTask", () => {
    it("should update the task with status 200", async () => {
      req.params = { id: taskId };
      req.body = mockTask;
      mockTaskService.updateTask.mockResolvedValue(mockTask);

      await taskController.updateTask(req as Request, res as Response);

      expect(mockTaskService.updateTask).toHaveBeenCalledWith(taskId, mockTask);
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(mockTask);
    });
  });

  describe("deleteTask", () => {
    it("should delete the task with status 204", async () => {
      req.params = { id: taskId };
      mockTaskService.deleteTask.mockResolvedValue(undefined as any);

      await taskController.deleteTask(req as Request, res as Response);

      expect(mockTaskService.deleteTask).toHaveBeenCalledWith(taskId);
      expect(statusMock).toHaveBeenCalledWith(204);
      expect(endMock).toHaveBeenCalled();
    });
  });
});
