import { z } from 'zod';

export const createOrderSchema = z.object({
    customerId: z.number().refine(value => value !== undefined, {
        message: 'Customer ID is required',
    }).refine(value => typeof value === 'number', {
        message: 'Customer ID must be a number',
    }),
    products: z.array(
        z.object({
        productId: z.number().refine(value => value !== undefined, {
            message: 'Product ID is required',
        }).refine(value => typeof value === 'number', {
            message: 'Product ID must be a number',
        }),
        quantity: z.number().refine(value => value !== undefined, {
            message: 'Quantity is required',
        }).refine(value => typeof value === 'number', {
            message: 'Quantity must be a number',
        }).min(0, 'Quantity must be at least 0'),
        })
    ).min(1, 'Order must have at least one product'),
});

export const updateOrderStatusSchema = z.object({
    status: z.enum(['pending', 'completed', 'cancelled']).describe('Order status'),
});

export const orderFilterSchema = z.object({
    customerId: z.number().optional(),
    productId: z.number().optional(),
    status: z.enum(['pending', 'completed', 'cancelled']).optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>;
export type OrderFilterInput = z.infer<typeof orderFilterSchema>;