import { Router } from 'express';
import orderController from '../controllers/orders.controller.ts';
import { validateBody } from '../middlewares/validate.middleware.ts';
import { createOrderSchema, updateOrderStatusSchema, orderFilterSchema } from '../schemas/order.schema.ts';

const router:Router = Router();

router.post('/', validateBody(createOrderSchema), orderController.createOrder);
router.get('/', validateBody(orderFilterSchema), orderController.getOrders);
router.get('/:id', orderController.getOrderById);
router.patch('/:id/status', validateBody(updateOrderStatusSchema), orderController.updateOrderStatus);

export default router;