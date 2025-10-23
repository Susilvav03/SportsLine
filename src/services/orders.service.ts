import { Transaction } from 'sequelize';
import Order, { OrderProduct } from '../models/order.model.ts';
import { Product } from '../models/product.model.ts';
import { Customer } from '../models/customer.model.ts';
import { sequelize } from '../config/database.ts';
import type { CreateOrderInput, OrderFilterInput, UpdateOrderStatusInput } from '../schemas/order.schema.ts';

class OrderService {
    async createOrder(data: CreateOrderInput): Promise<Order> {
        const result = await sequelize.transaction(async (t: Transaction) => {
        // Verificar el stock de todos los productos
        for (const item of data.products) {
            const product = await Product.findByPk(item.productId, { transaction: t });
            if (!product) {
            throw new Error(`Product with ID ${item.productId} not found`);
            }
            if (product.stock < item.quantity) {
            throw new Error(`Insufficient stock for product ${product.name}`);
            }
        }

        // Crear la orden
        const order = await Order.create(
            {
            customerId: data.customerId,
            status: 'pending',
            },
            { transaction: t }
        );

        let total = 0;

        // Crear los detalles de la orden y actualizar el stock
        for (const item of data.products) {
            const product = await Product.findByPk(item.productId, { transaction: t });
            if (!product) continue;

            await OrderProduct.create(
            {
                orderId: order.id,
                productId: item.productId,
                quantity: item.quantity,
                price: product.unit_price,
            },
            { transaction: t }
            );

            // Actualizar el stock
            const newStock = product.stock - item.quantity;
            if (newStock < 0) {
            throw new Error(`Negative stock not allowed for product ${product.name}`);
            }
            await product.update(
            {
                stock: newStock,
            },
            { transaction: t }
            );

            total += product.unit_price * item.quantity;
        }

        // Actualizar el total de la orden
        await order.update({ total }, { transaction: t });

        return order;
        });

        return result;
    }

    async updateOrderStatus(orderId: number, data: UpdateOrderStatusInput): Promise<Order> {
        const order = await Order.findByPk(orderId);
        if (!order) {
        throw new Error('Order not found');
        }

        await order.update({ status: data.status });
        return order;
    }

    async getOrderById(orderId: number): Promise<Order | null> {
        return Order.findByPk(orderId, {
        include: [
            {
            model: Product,
            through: { attributes: ['quantity', 'price'] },
            },
            {
            model: Customer,
            },
        ],
        });
    }

    async getOrders(filters: OrderFilterInput) {
        const where: any = {};
        if (filters.customerId) where.customerId = filters.customerId;
        if (filters.status) where.status = filters.status;
        if (filters.startDate) where.createdAt = { $gte: new Date(filters.startDate) };
        if (filters.endDate) where.createdAt = { ...where.createdAt, $lte: new Date(filters.endDate) };

        const orders = await Order.findAll({
        where,
        include: [
            {
            model: Product,
            through: { attributes: ['quantity', 'price'] },
            ...(filters.productId ? { where: { id: filters.productId } } : {}),
            },
            {
            model: Customer,
            },
        ],
        });

        return orders;
    }
}

export default new OrderService();