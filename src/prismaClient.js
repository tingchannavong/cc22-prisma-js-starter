import "dotenv/config"
import { PrismaClient } from "@prisma/client";
// import { PrismaClient } from "./generated/prisma/client.ts"
import { PrismaMariaDb } from "@prisma/adapter-mariadb"
import { PrismaPg } from "@prisma/adapter-pg";

// prisma client is similar to creating sql pool

// MYSQL SETTINGS
// const adapter = new PrismaMariaDb({
//     host: process.env.DATABASE_HOST,
//     user: process.env.DATABASE_USER,
//     password: process.env.DATABASE_PASSWORD,
//     database: process.env.DATABASE_NAME,
//     connectionLimit: 5
// });

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({adapter});

export default prisma;