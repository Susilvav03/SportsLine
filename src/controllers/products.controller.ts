import type { Request, Response } from 'express'
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from "../services/products.service.ts"
import { ProductSchema, ProductUpdateSchema } from "../schemas/product.schema.ts"

export async function createProductController (req: Request, res: Response) {
    try {
        const parsed = ProductSchema.parse(req.body)
        const product = await createProduct(parsed)
        res.status(201).json(product)
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error })
    }
}

export async function getAllProductsController (req: Request, res: Response) {
    try {
        const products = await getAllProducts()
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error })
    }
}

export async function getProductByIdController (req: Request, res: Response) {
    try {
        const id = Number(req.params.id)
        if (Number.isNaN(id)) {
        return res.status(400).json({ message: 'Invalid product ID' })
        }
        const product = await getProductById(id)
        if (!product) {
        return res.status(404).json({ message: 'Product not found' })
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error })
    }
}

export async function updateProductController (req: Request, res: Response) {
    try {
        const id = Number(req.params.id)
        if (Number.isNaN(id)) {
        return res.status(400).json({ message: 'Invalid product ID' })
        }
        const parsed = ProductUpdateSchema.parse(req.body)
    const product = await updateProduct(id, parsed as any)
        if (!product) {
        return res.status(404).json({ message: 'Product not found' })
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error })
    }
}

export async function deleteProductController (req: Request, res: Response) {
    try {
        const id = Number(req.params.id)
        if (Number.isNaN(id)) {
        return res.status(400).json({ message: 'Invalid product ID' })
        }
        const success = await deleteProduct(id)
        if (!success) {
        return res.status(404).json({ message: 'Product not found' })
        }
        res.status(204).send()
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error })
    }
}
