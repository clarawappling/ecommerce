import { useState } from "react";
import { OrderItem } from "../models/OrderItem";
import { deleteOrderItem } from "../services/orderItemService";

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
    return {
        deleteOrderItemHandler,
        error,
        isLoading
    }
}