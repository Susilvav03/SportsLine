import type { Request, Response, NextFunction } from 'express'
import { Customer } from '../models/index.models.ts'

export async function ensureUniqueCustomer(req: Request, res: Response, next: NextFunction) {
    const { document } = req.body
    if (!document) return res.status(400).json({ error: 'document is required' })
    const found = await Customer.findOne({ where: { document } })
    if (found) return res.status(409).json({ error: 'Customer document already exists' })
    return next()
}