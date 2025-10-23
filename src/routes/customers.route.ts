import { Router } from "express"
import { validateBody } from "../middlewares/validate.middleware.ts"
import { ensureUniqueCustomer } from "../middlewares/unique-document.middleware.ts";
import { CustomerSchema, CustomerUpdateSchema } from "../schemas/customer.schema.ts";
import { 
    createCustomerController, 
    getAllCustomersController, 
    getCustomerByIdController, 
    updateCustomerController, 
    deleteCustomerController } from "../controllers/customers.controller.ts"

const router:Router = Router()

// CRUD routes for Customer
router.post('/', validateBody(CustomerSchema), ensureUniqueCustomer, createCustomerController)
router.get('/', getAllCustomersController)
router.get('/:id', getCustomerByIdController)
router.patch('/:id', validateBody(CustomerUpdateSchema), updateCustomerController)
router.delete('/:id', deleteCustomerController)

export default router