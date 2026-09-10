import express from "express"
import jwt from "jsonwebtoken"
import { authenticate } from "./auth.middleware.js"

const app = express()
const JWT_SECRET = "trelloSecret"


let USERS_ID = 1
let ORGANIZATION_ID = 1
let BOARD_ID = 1
let ISSUES_ID = 1


const USERS = []
const ORGANIZATION = []
const BOARD = []
const ISSUES = []

app.use(express.json())


//NOTE All POST endpoints

// sign up
app.post("/signup", (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const userExists = USERS.find(user => user.username === username)
    if(userExists) {
        return res.status(403).json({
            message: "User already exists"
        })
    }

    USERS.push({
        id: USERS_ID++,
        username,
        password,
    })

    res.json({
        message: "You are signed up successfully"
    })
})

//sign in
app.post("/signin", (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const userExists = USERS.find(user => user.username === username && user.password === password)
    if(!userExists) {
        return res.status(403).json({
            message: "User doesn't exists. Sign up first."
        })
    }

    const token = jwt.sign({
        userId: userExists.id
    }, JWT_SECRET)

    res.json({
        token
    })

})

// app.use(authenticate())

// onboarding
app.post("/onboard", (req, res) => {
    
})

// create organization
app.post("/organization", authenticate, (req, res) => {
    const userId = req.userId

    ORGANIZATION.push({
        id: ORGANIZATION_ID,
        title: req.body.title,
        description: req.body.description,
        admin: userId,
        members: []
    })

    res.json({
        message: "Organization created",
        id: ORGANIZATION_ID - 1
    })

})
// dashboard/board
app.post("/create-board", (req, res) => {

})

// invite members
app.post("/members", (req, res) => {

})

//NOTE All GET endpoints

// get all boards
app.get("/boards", (req, res) => {

})

// get all issues
app.get("/issues", (req, res) => {

})

// get all members
app.get("/members", (req, res) => {

})

// update/edit issue
app.put("issues", (req, res) => {

})



app.listen(3000, () => {
    console.log(`http://localhost:3000`)
})