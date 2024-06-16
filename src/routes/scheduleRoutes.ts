import { Router } from "express";
import scheduleController from "../controllers/scheduleController";
import scheduleValidator from "../validators/scheduleValidator";
import { validateRequest } from "../middlewares/requestValidator";

const router = Router();

router.get("/", scheduleController.getAllSchedules);

router.get(
  "/:id",
  scheduleValidator.getScheduleById,
  validateRequest,
  scheduleController.getScheduleById
);

router.post(
  "/",
  scheduleValidator.createSchedule,
  validateRequest,
  scheduleController.createSchedule
);

router.put(
  "/:id",
  scheduleValidator.updateSchedule,
  validateRequest,
  scheduleController.updateSchedule
);

router.delete(
  "/:id",
  scheduleValidator.deleteSchedule,
  validateRequest,
  scheduleController.deleteSchedule
);

export { router as scheduleRoutes };
