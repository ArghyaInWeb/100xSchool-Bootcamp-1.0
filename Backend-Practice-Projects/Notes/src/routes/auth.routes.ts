import { client } from "../lib/prisma.ts";
import { Router } from "express";
import bcrypt from "bcrypt";

const router = Router();

router.post("/signup", async (req, res) => {
    const email: string = req.body.email
    const username: string = req.body.username
    const password: string = req.body.password

    const userExists = await client.user.findFirst({
        where: {
            OR: [
                { email: email },
                { username: username }
            ]
        }
    })

    if(userExists) {
        res.status(409).json({
            message: "User already exists! Check your email and username"
        })
        return
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await client.user.create({
        data: {
            email: email,
            username: username,
            hashedPassword: hashedPassword
        },
        select: {
            email: true,
            username: true
        }
    })

    res.status(201).json({
        message: "New user created successfully",
        newUser
    })
});
