import jwt from "jsonwebtoken"

export function authenticate(req, res, next) {
    const token = req.headers.token

    if(!token) {
        res.json({
            message: "Invalid token or token not found"
        })
        return
    }

    const decoded = jwt.verify(token, "secret123")
    const userId = decoded.userId

    if(!userId) {
        res.status(403).json({
            message: "Token malformed"
        })
        return
    }

    req.userId = userId
    next()
}


