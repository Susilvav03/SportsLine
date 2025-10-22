import { DataTypes, Model, type InferAttributes, type InferCreationAttributes, type CreationOptional } from 'sequelize'
import { sequelize } from '../config/database.ts'

export class Customer extends Model<
    InferAttributes<Customer>,
    InferCreationAttributes<Customer>
> {
    declare id: CreationOptional<number>
    declare document: number
    declare name: string
    declare email: string
    declare address: string
    declare created_at: CreationOptional<Date>
    declare updated_at: CreationOptional<Date>
}

Customer.init(
    {
        id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        },
        document: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        },
        name: {
        type: DataTypes.STRING(150),
        allowNull: false,
        },
        email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
        },
        address: {
        type: DataTypes.STRING(255),
        allowNull: false,
        },
        created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        },
        updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        tableName: 'Customers',
        timestamps: false,
        freezeTableName: true,
    }
)