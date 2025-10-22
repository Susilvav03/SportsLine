import { DataTypes, Model, type InferAttributes, type InferCreationAttributes, type CreationOptional } from 'sequelize'
import { sequelize } from '../config/database.ts'

export class User extends Model<
    InferAttributes<User>,
    InferCreationAttributes<User>
> {
    declare id: CreationOptional<number>
    declare name: string
    declare email: string
    declare password_hash: string
    declare role: CreationOptional<'admin' | 'seller'>
    declare created_at: CreationOptional<Date>
    declare updated_at: CreationOptional<Date>
}

User.init(
    {
        id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
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
        password_hash: {
        type: DataTypes.TEXT,
        allowNull: false,
        },
        role: {
        type: DataTypes.ENUM('admin', 'user'),
        allowNull: false,
        defaultValue: 'user',
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
        tableName: 'users',
        timestamps: false,
        freezeTableName: true,
    }
)