import { useState } from "react"
import { Customer, CustomerCreate, CustomerUpdate } from "../models/Customer"
import { createCustomer, deleteCustomer, getAllCustomers, getCustomerById, updateCustomer } from "../services/customerService";

export const useCustomer = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // GET ALL PRODUCTS
    const getAllCustomersHandler = async () => {
        setIsLoading(true)
        try {
            const data = await getAllCustomers();
            setCustomers(data);
        } catch (error) {
            setError("Error getting customers");
        } finally {
            setIsLoading(false);
        }
    }

    // GET SPECIFIC CUSTOMER
    const getCustomerByIdHandler = async (id: number) => {
        setIsLoading(true)
        try {
            return await getCustomerById(id);
        } catch (error) {
            setError("Error getting customer")
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    // CREATE NEW CUSTOMER
    const createCustomerHandler = async (payload: CustomerCreate) => {
        setIsLoading(true);

        try {
            await createCustomer(payload);
        } catch (error) {
            setError("Error creating a new customer")
            throw error;
        } finally {
            setIsLoading(false)
        }
    }

        // UPDATE CUSTOMER
        const updateCustomerHandler = async (id: number, payload: CustomerUpdate) => {
            setIsLoading(true);
            try {
                await updateCustomer(id, payload)
            } catch (error) {
                setError("Error updating customer");
                throw error;
            } finally {
                setIsLoading(false);
            }
        }

           // DELETE CUSTOMER
            const deleteCustomerHandler = async (id: number) => {
                setIsLoading(true);
                try {
                    await deleteCustomer(id);
                    const newList = customers.filter(customer => customer.id !== id);
                    setCustomers(newList);
                } catch (error) {
                    setError("Error deleting customer");
                    throw error;
                } finally {
                    setIsLoading(false);
                }
            } 


    return {
        getAllCustomersHandler,
        getCustomerByIdHandler,
        createCustomerHandler,
        updateCustomerHandler,
        deleteCustomerHandler,
        error,
        isLoading,
        customers
    }
}