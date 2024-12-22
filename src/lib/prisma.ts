import { PrismaClient } from "@prisma/client";

const getPrismaClient = () => new PrismaClient();

declare const globalThis: {
    prismaGlobal: ReturnType<typeof getPrismaClient>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? getPrismaClient();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;