import { Task } from "@prisma/client";
import { prisma } from "../utils/db";
import { UUID } from "crypto";

class TaskRepository {
  async findAllByScheduleId(scheduleId: UUID) {
    return await prisma.task.findMany({
      where: { schedule_id: scheduleId },
    });
  }

  async findById(id: UUID) {
    return await prisma.task.findUnique({
      where: { id },
    });
  }

  async create(task: Task) {
    return await prisma.task.create({
      data: task,
    });
  }

  async update(id: UUID, task: Task) {
    return await prisma.task.update({
      where: { id },
      data: task,
    });
  }

  async remove(id: UUID) {
    return await prisma.task.delete({
      where: { id },
    });
  }
}

export default new TaskRepository();
