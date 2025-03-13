import { useState } from "react"
import { DetailedOrder, Order, OrderStatusUpdate } from "../models/Order"
import { deleteOrder, fetchOrderById, fetchOrders, updateOrderStatus } from "../services/orderService";

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

// GET ORDER BY ID

const fetchOrderByIdHandler = async (id: number) => {
    setIsLoading(true);
    
    try {
        const data: DetailedOrder = await fetchOrderById(id);
        return data;
    } catch (error) {
        setError("Couldn't get order");
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


// UPDATE ORDER STATUS

const updateOrderStatusHandler = async (id: number, payload: OrderStatusUpdate) => {
    setIsLoading(true);

    try {
        await updateOrderStatus(id, payload);
    } catch (error) {
        setError("Error updating order status")
    } finally {
        setIsLoading(false);
    }
}

return {
    isLoading,
    error,
    orders,
    fetchOrdersHandler,
    deleteOrderHandler,
    updateOrderStatusHandler,
    fetchOrderByIdHandler
}
}