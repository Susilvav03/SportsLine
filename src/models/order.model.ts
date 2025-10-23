import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.ts';
import { Customer } from './customer.model.ts';
import { Product } from './product.model.ts';

class Order extends Model {
    public id!: number;
    public customerId!: number;
    public total!: number;
    public status!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
}

Order.init(
    {
        id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        },
        customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'customers',
            key: 'id',
        },
        },
        total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
        },
        status: {
        type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
        allowNull: false,
        defaultValue: 'pending',
        },
    },
    {
        sequelize,
        modelName: 'Order',
        tableName: 'orders',
    }
);

class OrderProduct extends Model {
    public orderId!: number;
    public productId!: number;
    public quantity!: number;
    public price!: number;
}

OrderProduct.init(
    {
        orderId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'orders',
            key: 'id',
        },
        },
        productId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'products',
            key: 'id',
        },
        },
        quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        },
        price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'OrderProduct',
        tableName: 'order_products',
    }
);

// Associations
Order.belongsTo(Customer);
Customer.hasMany(Order);

Order.belongsToMany(Product, { through: OrderProduct });
Product.belongsToMany(Order, { through: OrderProduct });

export { Order as default, OrderProduct };