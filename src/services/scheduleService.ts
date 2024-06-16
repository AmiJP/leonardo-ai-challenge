import { UUID } from "crypto";
import scheduleRepository from "../repositories/scheduleRepository";
import { Schedule } from "@prisma/client";
import { NotFoundError } from "../errors/notFoundError";

class ScheduleService {
  async getAllSchedules() {
    return await scheduleRepository.findAll();
  }

  async getScheduleById(id: UUID) {
    const schedule = await scheduleRepository.findById(id);
    if (!schedule) {
      throw new NotFoundError("Schedule not found");
    }
    return schedule;
  }

  async createSchedule(schedule: Schedule) {
    return await scheduleRepository.create(schedule);
  }

  async updateSchedule(id: UUID, schedule: Schedule) {
    const existingSchedule = await scheduleRepository.findById(id);
    if (!existingSchedule) {
      throw new NotFoundError("Schedule not found");
    }
    return await scheduleRepository.update(id, schedule);
  }

  async deleteSchedule(id: UUID) {
    const existingSchedule = await scheduleRepository.findById(id);
    if (!existingSchedule) {
      throw new NotFoundError("Schedule not found");
    }
    return await scheduleRepository.remove(id);
  }
}

export default new ScheduleService();
