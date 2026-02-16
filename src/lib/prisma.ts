import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

// In production, use pooler URL for serverless connections
// In development, use direct connection (faster, same as migrations)
const connectionString =
  process.env.NODE_ENV === "production"
    ? process.env.DATABASE_POOLER_URL
    : process.env.DATABASE_URL;

const adapter = new PrismaPg({
  connectionString,
});

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
