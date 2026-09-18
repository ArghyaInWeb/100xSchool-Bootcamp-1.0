import { client } from "../lib/prisma.ts";
import { Router } from "express";
import bcrypt from "bcrypt";

const authRouter = Router();

authRouter.post("/signup", async (req, res) => {
    const email: string = req.body.email;
    const username: string = req.body.username;
    const password: string = req.body.password;

    const userExists = await client.user.findFirst({
        where: {
            OR: [{ email: email }, { username: username }],
        },
    });

    if (userExists) {
        res.status(409).json({
            message: "User already exists! Check your email and username",
        });
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await client.user.create({
        data: {
            email: email,
            username: username,
            hashedPassword: hashedPassword,
        },
        select: {
            email: true,
            username: true,
        },
    });

    res.status(201).json({
        message: "New user created successfully",
        newUser,
    });
});

authRouter.post("/signin", async (req, res) => {
    const email: string = req.body.email;
    const password: string = req.body.password;

    const userExists = await client.user.findFirst({
        where: {
            email: email,
        },
    });

    if (!userExists) {
        res.status(401).json({
            message: "User doesn't exist. Signup first",
        });
        return;
    }

    const comparePassword = await bcrypt.compare(
        password,
        userExists.hashedPassword,
    );

    if (!comparePassword) {
        res.status(403).json({
            message: "Incorrect password",
        });
        return;
    }

    const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000;

    const newSession = await client.session.create({
        data: {
            user_id: userExists.id,
            expires_at: new Date(Date.now() + SESSION_DURATION),
        },
        select: {
            session_id: true,
        },
    });

    res.cookie("session", newSession.session_id, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: SESSION_DURATION,
    });

    res.status(200).json({
        message: "Signed in successfully",
    });
});

//TODO: logout route

export default authRouter
