import { Schedule } from "@prisma/client";
import { prisma } from "../utils/db";
import { UUID } from "crypto";

class ScheduleRepository {
  async findAll() {
    return await prisma.schedule.findMany();
  }

  async findById(id: UUID) {
    return await prisma.schedule.findUnique({
      where: { id },
    });
  }

  async create(schedule: Schedule) {
    return await prisma.schedule.create({
      data: schedule,
    });
  }

  async update(id: UUID, schedule: Schedule) {
    return await prisma.schedule.update({
      where: { id },
      data: schedule,
    });
  }

  async remove(id: UUID) {
    return await prisma.schedule.delete({
      where: { id },
    });
  }
}

export default new ScheduleRepository();
