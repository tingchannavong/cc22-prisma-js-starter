import prisma from "../src/prismaClient.js";
import { faker } from "@faker-js/faker";

// Auto-generate fake data for db
async function main() {
    await prisma.orderItem.createMany({
         data: Array.from({ length: 10 }).map(() => ({
            productId: faker.number.int({min: 1, max: 22}),
            orderId: faker.number.int({min: 1, max: 19}),
            quantity: faker.number.int({min: 1, max: 30}),
            priceAtTime: Number(faker.commerce.price())
        }))
    });
};

main().catch((error) => {
    console.error(error);
    process.exit(1);
}).finally( async () => {
    await prisma.$disconnect(); // disconnect from prisma
})