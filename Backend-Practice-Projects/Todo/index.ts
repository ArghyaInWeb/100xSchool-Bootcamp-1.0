import express from "express";
import { PrismaClient } from "./generated/prisma/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const client = new PrismaClient({ adapter });

const app = express();

app.use(express.json());

app.post("/todo", async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;

    const newTodo = await client.todo.create({
        data: {
            title: title,
            description: description,
        },
    });

    res.status(200).json({
        message: "Todo Created",
        newTodo,
    });
});

app.get("/todo", async (req, res) => {
    const todoId = Number(req.query.id);

    const todoExists = await client.todo.findFirst({
        where: {
            id: todoId,
        },
    });

    if (!todoExists) {
        res.status(404).json({
            message: "Todo not found",
        });
        return;
    }

    res.status(200).json({
        message: "Gor todo",
        todoExists,
    });
});

app.get("/todos", async(req, res) => {
    const allTodos = await client.todo.findMany()

    res.status(200).json({
        message: "Fetched all todos",
        allTodos
    })
})

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
