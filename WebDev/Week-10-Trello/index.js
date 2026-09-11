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

    const newUser = {
        id: USERS_ID,
        username,
        password,
    }

    USERS.push(newUser)
    USERS_ID++

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

    const newOrg = {
        id: ORGANIZATION_ID,
        title: req.body.title,
        description: req.body.description,
        admin: userId,
        members: []
    }

    ORGANIZATION.push(newOrg)
    ORGANIZATION_ID++

    res.json({
        message: "Organization created",
        id: newOrg.id //todo id or organization id on post/members
    })

})
// dashboard/board
app.post("/create-board", (req, res) => {

})

// invite members
app.post("/members", authenticate, (req, res) => {
    const userId = req.userId
    const organizationId = req.body.id //todo here!!!!
    const memberUsername = req.body.userName

    const organization = ORGANIZATION.find(org => org.id === organizationId)

    if(!organization || organization.admin !== userId) {
        res.status(411).json({
            message: "Organization doesn't exist."
        })
        return
    }

    const invitedUser = USERS.find(u => u.username === memberUsername)

    if(!invitedUser) {
        res.status(403).json({
            message: "User doesn't exist."
        })
        return
    }

    const alreadyMember = organization.members.some(id => id === invitedUser.id)
    if(alreadyMember) {
        res.status(409).json({
            message: "User is already a member"
        })
        return
    }
    
    organization.members.push(invitedUser.id)

    res.json({
        message: "Member successfully added to the organization"
    })
})

//NOTE All GET endpoints

// get all organizations
app.get("/organization", authenticate, (req, res) => {
    const userId = req.userId
    const organizationId = Number(req.query.organizationId) //todo whether to add NUMBER

    const organization = ORGANIZATION.find(org => org.id === organizationId)

    if(!organization) {
        res.status(411).json({
            message: "Organization doesn't exist. 1"
        })
        return
    }

    if(organization.admin !== userId) {
        res.status(411).json({
            message: "Organization doesn't exist. 2"
        })
        return
    }


    res.json({
        organization: {
            ...organization,
            members: organization.members.map(memberId => {
                const user = USERS.find(u => u.id === memberId)
                return {
                    id: user.id,
                    username: user.username
                }
            })
        }
    })
})

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

// delete/remove members
app.delete("/members", authenticate, (req, res) => {
    const userId = req.userId
    const organizationId = req.body.id
    const memberUsername = req.body.userName

    const organization = ORGANIZATION.find(org => org.id === organizationId)

    if(!organization || organization.admin !== userId) {
        res.status(411).json({
            message: "Organization doesn't exist."
        })
        return
    }

    const findUser = USERS.find(u => u.username === memberUsername)

    if(!findUser) {
        res.status(403).json({
            message: "User doesn't exist."
        })
        return
    }

    const isMember = organization.members.includes(findUser.id)
    if(!isMember) {
        res.status(411).res.json({
            message: "No user at this organization"
        })
        return
    }

    organization.members = organization.members.filter(id => id !== findUser.id)

    res.json({
        message: "Member removed from organization"
    })
})

app.listen(3000, () => {
    console.log(`http://localhost:3000`)
})