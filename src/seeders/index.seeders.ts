import 'dotenv/config'
import bcrypt from 'bcryptjs'
import { sequelize } from '../config/database.ts'
import { Customer, User, Product } from '../models/index.models.ts'

async function run() {
    await sequelize.authenticate()
    await sequelize.sync({ alter: true })

    const password = await bcrypt.hash('Admin123*', 10)

    await User.bulkCreate([
        { name: 'admin',   email: 'admin@sportsline.com',   password_hash: password, role: 'admin'},
        { name: 'seller', email: 'seller@sportsline.com', password_hash: password, role: 'seller'},
    ], { ignoreDuplicates: true })

    await Customer.bulkCreate([
        { document: 1234567890, name: 'Juan Perez',  email: 'juan@example.com',  address: 'Calle 1 #2-3' },
        { document: 1098765432, name: 'Maria Gomez', email: 'maria@example.com', address: 'Calle 4 #5-6' },
    ], { ignoreDuplicates: true })

    await Product.bulkCreate([
        { name: 'treadmill',     description: 'cinta de correr', unit_price: 25000 },
        { name: 'dumbbells 40lb',   description: 'mancuernas 20kg',  unit_price: 3000  },
    ], { ignoreDuplicates: true })

    console.log('✅ Seed completed')
    await sequelize.close()
}

run().catch(err => { console.error(err); process.exit(1) })