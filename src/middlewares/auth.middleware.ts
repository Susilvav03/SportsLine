import type { RequestHandler } from "express"
import jwt from "jsonwebtoken"


const JWT_SECRET = process.env.JWT_SECRET || "dev_secret"

export interface AuthRequest extends globalThis.Request {
    user?: any
}

export const requireAuth: RequestHandler = (req: any, res, next) => {
    try {
        const authHeader = req.headers?.authorization
        if (!authHeader) {
        return res.status(401).json({ error: "Authorization header missing" })
        }

        // The format expected is: "Bearer <token>"
        const token = authHeader.split(" ")[1];
        if (!token) {
        return res.status(401).json({ error: "Token missing" })
        }

        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET)

        // save the user info in req.user
        req.user = decoded

        next()
    } catch (error) {
        console.error("Auth Middleware Error:", error)
        return res.status(401).json({ error: "Invalid or expired token" })
    }
}
