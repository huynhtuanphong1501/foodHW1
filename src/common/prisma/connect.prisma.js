import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../prisma/generated/prisma/index.js";
import { DATABASE_URL } from "../constants/app.constant.js";

const url = new URL(DATABASE_URL);
const adapter = new PrismaMariaDb({
  host: url.hostname,
  user: url.username,
  password: url.password,
  database: url.pathname.substring(1),
  connectionLimit: 5,
});
const prisma = new PrismaClient({
  adapter,
  omit: {
    user: {
      password: true,
    },
  },
});

try {
  await prisma.$queryRaw`SELECT 1`;
  console.log("[PRISMA] Connected to the database successfully.");
} catch (error) {
  console.error("[PRISMA] Error connecting to the database:", error);
}

export { prisma };
