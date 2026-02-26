import prisma from "../src/prismaClient.js";
import { faker } from "@faker-js/faker";

// Auto-generate fake data for db
async function main() {
    await prisma.post.createMany({
        data: Array.from({ length: 1 }).map(() => ({
            title: faker.lorem.words(),
            content: faker.lorem.sentence(),
            published: true,
            userId: faker.number.int({min: 1, max: 19})
        })),
        });
    
    await prisma.order.createMany({
        data: Array.from({ length: 20 }).map(() => ({
            userId: faker.number.int({min: 1, max: 22})
        }))
    });
};

main().catch((error) => {
    console.error(error);
    process.exit(1);
}).finally( async () => {
    await prisma.$disconnect(); // disconnect from prisma
})