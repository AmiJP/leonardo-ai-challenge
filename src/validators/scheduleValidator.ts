import { body, param } from "express-validator";

class ScheduleValidator {
  createSchedule = [
    body("account_id").isInt().withMessage("Account ID must be an integer"),
    body("agent_id").isInt().withMessage("Agent ID must be an integer"),
    body("start_time").isISO8601().withMessage("Start time must be a date"),
    body("end_time").isISO8601().withMessage("End time must be a date"),
  ];

  updateSchedule = [
    param("id").isUUID().withMessage("Schedule ID must be a UUID"),
    body("account_id")
      .isInt()
      .optional()
      .withMessage("Account ID must be an integer"),
    body("agent_id")
      .isInt()
      .optional()
      .withMessage("Agent ID must be an integer"),
    body("start_time")
      .isISO8601()
      .optional()
      .withMessage("Start time must be a date"),
    body("end_time")
      .isISO8601()
      .optional()
      .withMessage("End time must be a date"),
  ];

  getScheduleById = [
    param("id").isUUID().withMessage("Schedule ID must be a UUID"),
  ];

  deleteSchedule = [
    param("id").isUUID().withMessage("Schedule ID must be a UUID"),
  ];
}

export default new ScheduleValidator();
