import type { Request, Response } from 'express'
import {createCustomer, getAllCustomers, getCustomerById, updateCustomer, deleteCustomer } from "../services/customers.service.ts";
import { CustomerSchema } from "../schemas/customer.schema.ts";
// Controller to handle creating a new customer
export async function createCustomerController (req: Request, res: Response) {
    try {
        const parsed = CustomerSchema.parse(req.body)
        const customer = await createCustomer(parsed)
        res.status(201).json(customer)
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error })
    }
}

// Controller to handle retrieving all customers
export async function getAllCustomersController (req: Request, res: Response) {
    try {
        const customers = await getAllCustomers()
        res.status(200).json(customers)
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error })
    }
}

// Controller to handle retrieving a customer by ID
export async function getCustomerByIdController (req: Request, res: Response) {
    try {
        const id = Number(req.params.id)
        if (Number.isNaN(id)) {
        return res.status(400).json({ message: 'Invalid customer ID' })
        }
        const customer = await getCustomerById(id)
        if (!customer) {
        return res.status(404).json({ message: 'Customer not found' })
        }
        res.status(200).json(customer)
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error })
    }
}

// Controller to handle updating a customer by ID
export async function updateCustomerController (req: Request, res: Response) {
    try {
        const id = Number(req.params.id)
        if (Number.isNaN(id)) {
        return res.status(400).json({ message: 'Invalid customer ID' })
        }
        const customer = await updateCustomer(id, req.body)
        if (!customer) {
        return res.status(404).json({ message: 'Customer not found' })
        }
        res.status(200).json(customer)
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error })
    }
}

// Controller to handle deleting a customer by ID
export async function deleteCustomerController (req: Request, res: Response) {
    try {
        const id = Number(req.params.id)
        if (Number.isNaN(id)) {
        return res.status(400).json({ message: 'Invalid customer ID' })
        }
        const success = await deleteCustomer(id)
        if (!success) {
        return res.status(404).json({ message: 'Customer not found' })
        }
        res.status(204).send()
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error })
    }
}