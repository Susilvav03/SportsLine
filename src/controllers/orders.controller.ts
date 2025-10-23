import type { Request, Response } from 'express';
import orderService from '../services/orders.service.ts';
import { createOrderSchema, orderFilterSchema, updateOrderStatusSchema } from '../schemas/order.schema.ts';

class OrderController {
    async createOrder(req: Request, res: Response) {
        try {
        const validatedData = createOrderSchema.parse(req.body);
        const order = await orderService.createOrder(validatedData);
        res.status(201).json(order);
        } catch (error: any) {
        if (error.name === 'ZodError') {
            return res.status(400).json({ message: error.errors });
        }
        res.status(500).json({ message: error.message });
        }
    }

    async updateOrderStatus(req: Request, res: Response) {
        try {
        const orderId = parseInt(req.params.id || '');
        const validatedData = updateOrderStatusSchema.parse(req.body);
        const order = await orderService.updateOrderStatus(orderId, validatedData);
        res.json(order);
        } catch (error: any) {
        if (error.name === 'ZodError') {
            return res.status(400).json({ message: error.errors });
        }
        res.status(500).json({ message: error.message });
        }
    }

    async getOrderById(req: Request, res: Response) {
        try {
        const orderId = parseInt(req.params.id || '0');
        const order = await orderService.getOrderById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
        } catch (error: any) {
        res.status(500).json({ message: error.message });
        }
    }

    async getOrders(req: Request, res: Response) {
        try {
        const filters = orderFilterSchema.parse(req.query);
        const orders = await orderService.getOrders(filters);
        res.json(orders);
        } catch (error: any) {
        if (error.name === 'ZodError') {
            return res.status(400).json({ message: error.errors });
        }
        res.status(500).json({ message: error.message });
        }
    }
}

export default new OrderController();