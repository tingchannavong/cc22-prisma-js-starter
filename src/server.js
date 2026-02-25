import express from "express";
import prisma from "./prismaClient.js";

const app = express();
const PORT = 8888;

app.use(express.json());

app.get('/', (re, res) => {
    res.send('welcome to learning prisma ORM');
});

app.get('/users', async (re, res) => {
    const users = await prisma.user.findMany();
    console.log(users);
    res.json(users);
});

app.listen(PORT, () => {
    console.log(`Server is running http://localhost:${PORT}`);
});