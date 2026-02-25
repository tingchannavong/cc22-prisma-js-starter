import "dotenv/config"
import { PrismaClient } from "@prisma/client";
// import { PrismaClient } from "./generated/prisma/client.ts"
import { PrismaMariaDb } from "@prisma/adapter-mariadb"

// prisma client is similar to creating sql pool

const adapter = new PrismaMariaDb({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    connectionLimit: 10
})

const prisma = new PrismaClient({adapter});

export default prisma;