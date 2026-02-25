import express from "express";

const app = express();
const PORT = 8888;

app.use(express.json());

app.get('/', (re, res) => {
    res.send('welcome to learning prisma ORM');
})

app.listen(PORT, () => {
    console.log(`Server is running http://localhost:${PORT}`);
});