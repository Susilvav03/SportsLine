import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { User } from "../models/index.models.ts"
import "dotenv/config"

const SALT_ROUNDS = process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 10
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret"

type CreateUserInput = {
    name: string
    email: string
    password: string
    role?: string
}

type AuthResult = {
    user: Record<string, unknown>
}

type AuthWithTokenResult = {
    user: Record<string, unknown>
    token: string
}

/**
 * Create a new user and return a safe user object (without password_hash)
 */
const createUser = async ({ name, email, password, role }: CreateUserInput): Promise<AuthResult> => {
    const exists = await User.findOne({ where: { email } })
    if (exists) {
        throw { status: 409, message: "User already exists" }
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

        const user = await User.create({
            name,
            email,
            password_hash: hashedPassword,
            role: (role ?? "seller") as any,
        })

    const { password_hash: _, ...safeUser } = user.get({ plain: true })
    return { user: safeUser }
}

/**
 * Authenticate user credentials and return user + token
 */
const authenticateUser = async (email: string, password: string): Promise<AuthWithTokenResult> => {
    const user = await User.findOne({
        where: { email },
        attributes: ["id", "name", "email", "password_hash", "role"],
    })

    if (!user) throw { status: 401, message: "Invalid credentials" }

    const valid = await bcrypt.compare(password, user.password_hash)
    if (!valid) throw { status: 401, message: "Invalid credentials" }

    const token = jwt.sign({ sub: user.id, email: user.email, rol: user.role }, JWT_SECRET, { expiresIn: "1h" })

    const { password_hash: _, ...safeUser } = user.get({ plain: true })

    return { user: safeUser, token }
}

export { createUser, authenticateUser }