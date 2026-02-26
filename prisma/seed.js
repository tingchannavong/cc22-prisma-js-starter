import prisma from "../src/prismaClient.js";
import { faker } from "@faker-js/faker";

// Auto-generate fake data for db
async function main() {
    // command to DELETE all products
    await prisma.product.deleteMany();

    // RAW SQL EXECUTIONS
    await prisma.$executeRaw`TRUNCATE TABLE Product;`;
    const authorName = 'bilbo';
    await prisma.$queryRaw`SELECT * FROM Author WHERE name = ${authorName};`;

     // manual way of writing data
    await prisma.product.createMany({
        data: [
        {
            name: "keyboard",
            price: 2500,
            stock: 20,
        },
        {
            name: "mouse",
            price: 100,
            stock: 3,
        },
        ],
    });

    await prisma.product.createMany({
        // array.from orders loop of 20 arrays
        data: Array.from({length: 1}).map(()=> (
            {
            name: faker.commerce.productName(),
            price: Number(faker.commerce.price()),
            stock: faker.number.int({min: 0, max: 100})
        }
        )) 
    });

    await prisma.user.createMany({
        data: Array.from({ length: 1 }).map(() => ({
            name: faker.person.fullName(),
            email: faker.internet.email(),
            age: faker.number.int({min: 10, max: 80})
        })),
        });
};

main().catch((error) => {
    console.error(error);
    process.exit(1);
}).finally( async () => {
    await prisma.$disconnect(); // disconnect from prisma
})