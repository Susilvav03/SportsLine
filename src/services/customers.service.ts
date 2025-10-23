import { Customer } from "../models/index.models.ts"

export type CreateCustomerInput = {
    document: number
    name: string
    email: string
    address: string
};

export type UpdateCustomerInput = Partial<CreateCustomerInput>

export function createCustomer(data: CreateCustomerInput) {
    return Customer.create(data)
}

export function getAllCustomers() {
    return Customer.findAll({ order: [['id', 'ASC']] })
}

export function getCustomerById(id: number) {
    return Customer.findByPk(id)
}

export async function updateCustomer(id: number, data: UpdateCustomerInput) {
    const customer = await getCustomerById(id)
    if (!customer) return null
    return customer.update(data)
}

export async function deleteCustomer(id: number) {
    const customer = await getCustomerById(id)
    if (!customer) return null
    await customer.destroy()
    return true
}