import { Product } from "../models/index.models.ts"

export type CreateProductDTO = {
    code: string
    name: string
        description?: string | null | undefined
    unit_price: number
}

export type UpdateProductDTO = Partial<CreateProductDTO>

export function createProduct(data: CreateProductDTO) {
    return Product.create(data as any)
}

export function getAllProducts() {
    return Product.findAll({ where: { is_deleted: false }, order: [["id", "ASC"]] })
}

export function getProductById(id: number) {
    return Product.findByPk(id)
}

export async function updateProduct(id: number, data: UpdateProductDTO) {
    const product = await getProductById(id)
    if (!product) return null
        return product.update(data as any)
}

export async function deleteProduct(id: number) {
    const product = await Product.findByPk(id)
    if (!product) return false;
    await product.update({ is_deleted: true })
    return true
}



