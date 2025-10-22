import { z } from "zod"

// Base user schema
const baseUser = z.object({
    name: z.string().min(3, "The name must have at least 3 characters"),
    email: z.string().email("Invalid email address"),
    role: z.enum(["admin", "seller"]).default("seller")
})

// Schema for user registration
export const UserRegisterSchema = baseUser.extend({
    password: z.string().min(6, "The password must have at least 6 characters"),
})

// Schema for user login
export const UserLoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

export const UserUpdateSchema = baseUser.partial()