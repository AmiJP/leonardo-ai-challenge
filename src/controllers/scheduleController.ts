import { Request, Response } from "express";
import { UUID } from "crypto";
import scheduleService from "../services/scheduleService";

class ScheduleController {
  async getAllSchedules(req: Request, res: Response) {
    const schedules = await scheduleService.getAllSchedules();
    res.status(200).json(schedules);
  }

  async getScheduleById(req: Request, res: Response) {
    const scheduleId = req.params.id as UUID;
    const schedule = await scheduleService.getScheduleById(scheduleId);
    res.status(200).json(schedule);
  }

  async createSchedule(req: Request, res: Response) {
    const schedule = req.body;
    const newSchedule = await scheduleService.createSchedule(schedule);
    res.status(201).json(newSchedule);
  }

  async updateSchedule(req: Request, res: Response) {
    const scheduleId = req.params.id as UUID;
    const schedule = req.body;
    const updatedSchedule = await scheduleService.updateSchedule(
      scheduleId,
      schedule
    );
    res.status(200).json(updatedSchedule);
  }

  async deleteSchedule(req: Request, res: Response) {
    const scheduleId = req.params.id as UUID;
    await scheduleService.deleteSchedule(scheduleId);
    res.status(204).end();
  }
}

export default new ScheduleController();
