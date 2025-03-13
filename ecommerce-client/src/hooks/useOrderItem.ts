import { useState } from "react";
import { OrderItem, OrderItemUpdate } from "../models/OrderItem";
import { deleteOrderItem, updateOrderItem } from "../services/orderItemService";

export const useOrderItem = () => {

const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
const [error, setError] = useState<string>("");
const [isLoading, setIsLoading] = useState<boolean>(false)


const deleteOrderItemHandler = async (id: number) => {
    setIsLoading(true)
    try {
        await deleteOrderItem(id);
        const newList = orderItems.filter(orderItem => orderItem.id !== id)
        setOrderItems(newList)
    } catch (error) {
        setError("Couldn't delete order item")
        throw error;
    } finally {
        setIsLoading(false)
    }
}

const updateOrderItemHandler = async (id: number, payload: OrderItemUpdate) => {
    setIsLoading(true)
    try {
        await updateOrderItem(id, payload);
    } catch (error) {
        setError("Couldn't update order item")
        throw error;
    } finally {
        setIsLoading(false)
    }
}
    return {
        deleteOrderItemHandler,
        updateOrderItemHandler,
        error,
        isLoading
    }
}