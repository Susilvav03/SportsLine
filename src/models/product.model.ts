import { DataTypes, Model, type InferAttributes, type InferCreationAttributes, type CreationOptional } from 'sequelize';
import { sequelize } from '../config/database.ts'

export class Product extends Model<
    InferAttributes<Product>,
    InferCreationAttributes<Product>
> {
    declare id?: CreationOptional<number>
    declare code: string
    declare name: string
    declare description?: string | null
    declare unit_price: number
    declare stock: number
    declare is_deleted?: CreationOptional<boolean>
    declare created_at?: CreationOptional<Date>
    declare updated_at?: CreationOptional<Date>
}

Product.init(
    {
        id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        },
        code: {
        type: DataTypes.STRING(100),
        allowNull: false,
        },
        name: {
        type: DataTypes.STRING(200),
        allowNull: false,
        },
        description: {
        type: DataTypes.TEXT,
        allowNull: true,
        },
        unit_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 0 },
        },
        is_deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        },
        created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        },
        stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: { min: 0 },
        },
        updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        tableName: 'products',
        timestamps: false,
        freezeTableName: true,
    }
)