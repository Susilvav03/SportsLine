import { type RequestHandler } from "express"
import type { ZodSchema } from "zod"

export const validateBody = (schema: ZodSchema): RequestHandler => (req, res, next) => {
  try {
    schema.parse(req.body)
    return next()
  } catch (err: any) {
    return res.status(400).json({ error: err.issues ?? err.message })
  }
}
