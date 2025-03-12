import { useState } from "react"
import { Order } from "../models/Order"
import { deleteOrder, fetchOrders } from "../services/orderService";

export const useOrder = () => {

const [orders, setOrders] = useState<Order[]>([]);
const [error, setError] = useState<string>("");
const [isLoading, setIsLoading] = useState<boolean>(false)


// GET ALL ORDERS

const fetchOrdersHandler = async () => {
    setIsLoading(true);

    try {
        const data = await fetchOrders();
        setOrders(data);
    } catch (error) {
        setError("Error getting orders")
        throw error;
    } finally {
        setIsLoading(false);
    }
}

// DELETE ORDER

const deleteOrderHandler = async (id: number) => {
    setIsLoading(true)
    try {
        await deleteOrder(id);
        const newList = orders.filter(order => order.id !== id);
        setOrders(newList);
    } catch (error) {
        setError("Error deleting order")
    } finally {
        setIsLoading(false);
    }
}

return {
    isLoading,
    error,
    orders,
    fetchOrdersHandler,
    deleteOrderHandler
}
}