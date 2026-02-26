import express from "express";
import prisma from "./prismaClient.js";

const app = express();
const PORT = 8888;

app.use(express.json());

app.get('/', (re, res) => {
    res.send('welcome to learning prisma ORM');
});

app.get('/users', async (re, res) => {
    // we will have received page from frontend
    const page = 2;
    const limit = 10;
    // pagination logic
    const users = await prisma.user.findMany({  
        skip: (page - 1) * limit,
        take: limit
    });
    // console.log(users);
    res.json(users);
});

app.get('/users/:id', async (re, res) => {
    const id = Number(re.params.id);
    const user = await prisma.user.findUnique({
        where: {id }, // can have many where conditions
        include: { posts: true,
            _count: {
                select: {
                    posts: true 
                }
            } // prisma's aggregate function 
         } // include is like join post table, useful and shorthand!
    });
    res.json(user);
});

app.post('/users', async (re, res) => {
    const { age, email, name } = re.body;
    const newUser = await prisma.user.create({
        data: {
            age,
            email,
            name
        }
    });

    res.json({
        message: 'user added',
        newUser
    })

});

app.get('/posts', async (re, res) => {
    const posts = await prisma.post.findMany();
    res.json(posts);
});

app.get('/products/count', async (re, res) => {
    const count = await prisma.product.count(); // count direct from table
    res.json({count});
});

app.listen(PORT, () => {
    console.log(`Server is running http://localhost:${PORT}`);
});