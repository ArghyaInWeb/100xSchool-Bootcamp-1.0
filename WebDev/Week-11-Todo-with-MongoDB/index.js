import express from "express"
import jwt from "jsonwebtoken"
import { authenticate } from "./auth.middleware.js"
import { userModel, todoModel } from "./models.js"

const app = express()
app.use(express.json())

app.post("/signup", async(req, res) => {
    const username = req.body.username
    const password = req.body.password

    const isUser = await userModel.findOne({
        username: username,
        password: password
    })

    if(isUser) {
        res.status(403).json({
            message: "User already exists"
        })
        return
    }

    const newUser = await userModel.create({
        username: username,
        password: password
    })

    res.json({
        userId: newUser._id,
        message: "Signed up successfully"
    })
    
})

app.post("/signin", async(req, res) => {
    const username = req.body.username
    const password = req.body.password

    const isUser = await userModel.findOne({
        username: username,
        password: password
    })

    if(!isUser) {
        res.status(403).json({
            message: "User does not exists"
        })
        return
    }

    const token = jwt.sign({
        userId: isUser._id
    }, "secret123")

    res.json({
        // message: "Signed in Successfully",
        token
    })
})

app.post("/todo", authenticate, async(req, res) => {
    const userId = req.userId
    const title = req.body.title
    const description = req.body.description

    if(!title || !description) {
        res.status(400).json({
            message: "Title or Description is missing"
        })
    }

    const newTodo = await todoModel.create({
        title,
        description,
        userId
    })

    res.json({
        message: "Todo created successfully"
    })

})

app.get("/todos", authenticate, async(req, res) => {
    const userId = req.userId

    const findUserTodos = await todoModel.find({
        userId: userId
    })

    res.json({
        findUserTodos
    })
})

app.delete("/todo", authenticate, async(req, res) => {
    const userId = req.userId
    const todoId = req.body.todoId

    const deleteTodo = await todoModel.findOneAndDelete({
        _id: todoId,
        userId: userId
    })

    if(!deleteTodo) {
        res.status(403).json({
            message: "Todo not found or not authorized"
        })
        return
    }

    res.json({
        todo: deleteTodo,
        message: "Todo deleted successfully"
    })

})

app.listen(3000, () => {
    console.log("http://localhost:3000")
})

