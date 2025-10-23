import { Router } from "express"
import { ensureUniqueProduct } from "../middlewares/unique-code.middleware.ts";
import { validateBody } from "../middlewares/validate.middleware.ts"
import { ProductSchema, ProductUpdateSchema } from "../schemas/product.schema.ts";
import { 
    createProductController, 
    getAllProductsController, 
    getProductByIdController, 
    updateProductController, 
    deleteProductController } from "../controllers/products.controller.ts"

const router:Router = Router()

router.post('/', validateBody(ProductSchema), ensureUniqueProduct, createProductController)
router.get('/', getAllProductsController)
router.get('/:id', getProductByIdController)
router.patch('/:id', validateBody(ProductUpdateSchema), updateProductController)
router.delete('/:id', deleteProductController)

export default router
