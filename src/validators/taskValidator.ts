import { body, param } from "express-validator";

class TaskValidator {
  createTask = [
    body("account_id").isInt().withMessage("Account ID must be an integer"),
    body("schedule_id").isUUID().withMessage("Schedule ID must be a UUID"),
    body("start_time").isISO8601().withMessage("Start time must be a date"),
    body("duration").isInt().withMessage("Duration must be an integer"),
    body("type")
      .isIn(["break", "work"])
      .withMessage("Type must be either 'break' or 'work'"),
  ];
  updateTask = [
    param("id").isUUID().withMessage("Task ID must be a UUID"),
    body("account_id")
      .isInt()
      .optional()
      .withMessage("Account ID must be an integer"),
    body("schedule_id")
      .isUUID()
      .optional()
      .withMessage("Schedule ID must be a UUID"),
    body("start_time")
      .isISO8601()
      .optional()
      .withMessage("Start time must be a date"),
    body("duration")
      .isInt()
      .optional()
      .withMessage("Duration must be an integer"),
    body("type")
      .isIn(["break", "work"])
      .optional()
      .withMessage("Type must be either 'break' or 'work"),
  ];

  getTasksByScheduleId = [
    param("scheduleId").isUUID().withMessage("Schedule ID must be a UUID"),
  ];

  getTaskById = [param("id").isUUID().withMessage("Task ID must be a UUID")];

  deleteTask = [param("id").isUUID().withMessage("Task ID must be a UUID")];
}

export default new TaskValidator();
