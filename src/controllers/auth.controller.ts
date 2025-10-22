import { type Request, type Response } from "express"
import { createUser, authenticateUser } from "../services/auth.service.ts"
import { UserLoginSchema, UserRegisterSchema } from "../schemas/user.schema.ts"

const register = async (req: Request, res: Response) => {
    try {
        const parsed = UserRegisterSchema.parse(req.body)
        const result = await createUser(parsed)
        return res.status(201).json({ message: "User registered successfully", user: result.user })
    } catch (error: any) {
        if (error?.status && error?.message) return res.status(error.status).json({ error: error.message })
        if (error?.issues) return res.status(400).json({ error: error.issues })
        console.error("Register controller error", error)
        return res.status(500).json({ error: "Internal server error" })
    }
}

const login = async (req: Request, res: Response) => {
    try {
        const parsed = UserLoginSchema.parse(req.body)
        const { user, token } = await authenticateUser(parsed.email, parsed.password)
        return res.json({ message: "Login successful", user, token })
    } catch (error: any) {
        if (error?.status && error?.message) return res.status(error.status).json({ error: error.message })
        if (error?.issues) return res.status(400).json({ error: error.issues })
        console.error("Login controller error", error)
        return res.status(500).json({ error: "Internal server error" })
    }
}

export { register, login }
