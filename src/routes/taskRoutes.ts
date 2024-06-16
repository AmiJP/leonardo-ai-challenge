import { Router } from "express";
import taskController from "../controllers/taskController";
import taskValidator from "../validators/taskValidator";
import { validateRequest } from "../middlewares/requestValidator";

const router = Router();

router.get(
  "/schedule/:scheduleId",
  taskValidator.getTasksByScheduleId,
  validateRequest,
  taskController.getTasksByScheduleId
);

router.get(
  "/:id",
  taskValidator.getTaskById,
  validateRequest,
  taskController.getTaskById
);

router.post(
  "/",
  taskValidator.createTask,
  validateRequest,
  taskController.createTask
);

router.put(
  "/:id",
  taskValidator.updateTask,
  validateRequest,
  taskController.updateTask
);

router.delete(
  "/:id",
  taskValidator.deleteTask,
  validateRequest,
  taskController.deleteTask
);

export { router as taskRoutes };
