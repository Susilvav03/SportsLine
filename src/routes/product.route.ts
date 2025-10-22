import { Router } from "express"
import { 
    createProductController, 
    getAllProductsController, 
    getProductByIdController, 
    updateProductController, 
    deleteProductController } from "../controllers/products.controller.ts"

const router:Router = Router()

router.post('/', createProductController)
router.get('/', getAllProductsController)
router.get('/:id', getProductByIdController)
router.patch('/:id', updateProductController)
router.delete('/:id', deleteProductController)

export default router
