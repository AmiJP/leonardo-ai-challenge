import { UUID } from "crypto";
import { Task } from "@prisma/client";
import taskRepository from "../repositories/taskRepository";
import { NotFoundError } from "../errors/notFoundError";
import scheduleRepository from "../repositories/scheduleRepository";

class TaskService {
  async getTasksByScheduleId(scheduleId: UUID) {
    const scheduleExists = await scheduleRepository.findById(scheduleId);
    if (!scheduleExists) {
      throw new NotFoundError("Schedule not found");
    }
    return await taskRepository.findAllByScheduleId(scheduleId);
  }

  async getTaskById(id: UUID) {
    const task = await taskRepository.findById(id);
    if (!task) {
      throw new NotFoundError("Task not found");
    }
    return task;
  }

  async createTask(task: Task) {
    const scheduleId = task.schedule_id as UUID;
    const scheduleExists = await scheduleRepository.findById(scheduleId);
    if (!scheduleExists) {
      throw new NotFoundError("Schedule not found");
    }
    return await taskRepository.create(task);
  }

  async updateTask(id: UUID, task: Task) {
    const existingTask = await taskRepository.findById(id);
    if (!existingTask) {
      throw new NotFoundError("Task not found");
    }

    if (task?.schedule_id) {
      const scheduleExists = await scheduleRepository.findById(
        task.schedule_id as UUID
      );
      if (!scheduleExists) {
        throw new NotFoundError("Schedule not found");
      }
    }

    return await taskRepository.update(id, task);
  }

  async deleteTask(id: UUID) {
    const existingTask = await taskRepository.findById(id);
    if (!existingTask) {
      throw new NotFoundError("Task not found");
    }
    return await taskRepository.remove(id);
  }
}

export default new TaskService();
