import type { RequestHandler } from "express"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret"

export interface AuthRequest extends globalThis.Request {
    user?: { sub?: number; email?: string; rol?: string }
}

export const requireAuth: RequestHandler = (req: any, res, next) => {
    const authHeader = req.headers?.authorization
    if (!authHeader) return res.status(401).json({ error: "Authorization header missing" })

    const parts = authHeader.split(" ")
    if (parts.length !== 2 || parts[0] !== "Bearer") return res.status(401).json({ error: "Invalid authorization format" })

    const token = parts[1]
    try {
        const payload = jwt.verify(token, JWT_SECRET) as any
        req.user = { sub: payload.sub, email: payload.email, rol: payload.rol }
        return next()
    } catch (err) {
        return res.status(401).json({ error: "Invalid or expired token" })
    }
}
