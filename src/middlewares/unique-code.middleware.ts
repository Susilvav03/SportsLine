import type { Request, Response, NextFunction } from 'express'
import { Product } from '../models/index.models.ts'

export async function ensureUniqueProduct(req: Request, res: Response, next: NextFunction) {
    const { code } = req.body
    if (!code) return res.status(400).json({ error: 'code is required' })
    const found = await Product.findOne({ where: { code } })
    if (found) return res.status(409).json({ error: 'Product code already exists' })
    return next()
}