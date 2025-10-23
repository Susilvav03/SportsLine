import { z } from "zod"

// Base product schema
export const ProductSchema = z.object({
    code: z.string().min(3, "The code must have at least 3 characters"),
    name: z.string().min(2, "The name must have at least 2 characters"),
    description: z.string().optional(),
    unit_price: z.number().min(1, "To create a product it must have a price"),
})

// Schema for update product
const baseUpdateSchema = ProductSchema.extend({
    is_deleted: z.boolean().default(false)
})

export const ProductUpdateSchema = baseUpdateSchema.partial()