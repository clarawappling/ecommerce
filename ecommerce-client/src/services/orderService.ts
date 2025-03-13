import axios from "axios"
import { DetailedOrder, Order, OrderStatusUpdate } from "../models/Order";


    const ORDERS_URL = "http://localhost:3000/orders"
   
    // FETCH ALL ORDERS
    export const fetchOrders = async (): Promise<Order[]> => {
        try {
            const response = await axios.get<Order[]>(ORDERS_URL);
        return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    // GET ORDER BY ID

    export const fetchOrderById = async (id: number): Promise <DetailedOrder> => {
        try {
            const response = await axios.get(`${ORDERS_URL}/${id}`);
            return response.data;
        } catch(error) {
            console.log(error)
            throw error;
        }
    }

    // DELETE ORDER
    export const deleteOrder = async (id: number) => {
        try {
            await axios.delete(`${ORDERS_URL}/${id}`);
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    // UPDATE ORDER STATUS

    export const updateOrderStatus = async (id: number, payload: OrderStatusUpdate) => {
        try {
            await axios.patch(`${ORDERS_URL}/${id}`, payload)
        } catch (error) {
            console.log(error);
            throw error;

        }
    }