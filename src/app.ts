import express from "express";
import "express-async-errors";
import { scheduleRoutes } from "./routes/scheduleRoutes";
import { taskRoutes } from "./routes/taskRoutes";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { requestLogger } from "./middlewares/requestLogger";
import { NotFoundError } from "./errors/notFoundError";

const app = express();

app.use(express.json());
app.use(requestLogger);

app.use("/api/schedules", scheduleRoutes);
app.use("/api/tasks", taskRoutes);

// Not Found Route
app.use("*", async () => {
  throw new NotFoundError();
});

// Error handling middleware
app.use(errorMiddleware);

export default app;
