import { execSync } from "child_process";
import * as dotenv from "dotenv";
import { prisma } from "../utils/db";

dotenv.config({ path: ".env.test" });

beforeAll(async () => {
  await prisma.$connect();
  execSync("npx prisma migrate dev --name init");
});

beforeEach(async () => {
  const deleteTasks = prisma.task.deleteMany();
  const deleteSchedules = prisma.schedule.deleteMany();
  await prisma.$transaction([deleteTasks, deleteSchedules]);
});

afterAll(async () => {
  await prisma.$disconnect();
});
