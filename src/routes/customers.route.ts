import { Router } from "express"
import { 
    createCustomerController, 
    getAllCustomersController, 
    getCustomerByIdController, 
    updateCustomerController, 
    deleteCustomerController } from "../controllers/customers.controller.ts"

const router:Router = Router()

// CRUD routes for Customer
router.post('/', createCustomerController)
router.get('/', getAllCustomersController)
router.get('/:id', getCustomerByIdController)
router.patch('/:id', updateCustomerController)
router.delete('/:id', deleteCustomerController)

export default router