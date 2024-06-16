import { Request, Response } from "express";
import { UUID } from "crypto";
import taskService from "../services/taskService";

class TaskController {
  async getTasksByScheduleId(req: Request, res: Response) {
    const scheduleId = req.params.scheduleId as UUID;
    const tasks = await taskService.getTasksByScheduleId(scheduleId);
    res.status(200).json(tasks);
  }

  async getTaskById(req: Request, res: Response) {
    const taskId = req.params.id as UUID;
    const task = await taskService.getTaskById(taskId);
    res.status(200).json(task);
  }

  async createTask(req: Request, res: Response) {
    const task = req.body;
    const newTask = await taskService.createTask(task);
    res.status(201).json(newTask);
  }

  async updateTask(req: Request, res: Response) {
    const taskId = req.params.id as UUID;
    const task = req.body;
    const updatedTask = await taskService.updateTask(taskId, task);
    res.status(200).json(updatedTask);
  }

  async deleteTask(req: Request, res: Response) {
    const taskId = req.params.id as UUID;
    await taskService.deleteTask(taskId);
    res.status(204).end();
  }
}

export default new TaskController();
