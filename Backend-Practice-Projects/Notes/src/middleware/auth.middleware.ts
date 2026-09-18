import type { Request, Response, NextFunction } from "express";
import { client } from "../lib/prisma.ts";

export async function requireAuth(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const sessionId: string | undefined = req.cookies.session;

    if (!sessionId) {
        res.status(401).json({
            message: "Unauthorized request",
        });
        return;
    }

    const sessionExists = await client.session.findUnique({
        where: {
            session_id: sessionId,
        },
        select: {
            user_id: true,
            expires_at: true,
        },
    });

    if (!sessionExists) {
        res.status(401).json({
            message: "Unauthorized request",
        });
        return;
    }

    const sessionExpiryDate = sessionExists.expires_at.getTime();
    if (sessionExpiryDate < Date.now()) {
        await client.session.delete({
            where: {
                session_id: sessionId,
            },
        });

        res.status(401).json({
            message: "Unauthorized request",
        });
        return;
    }

    req.user_id = sessionExists.user_id;
    next();
}
