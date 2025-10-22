import { z } from "zod"

// Base customer schema
export const baseCustomer = z.object({
    document: z.number().min(1, "To create a customer it must have a document number"),
    name: z.string().min(3, "The name must have at least 3 characters"),
    email: z.string().email("Invalid email address"),
    address: z.string().min(1, "To create a customer it must have an address"),
})

export const CustomerUpdateSchema = baseCustomer.partial()