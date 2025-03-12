import axios from "axios"
import { Order } from "../models/Order";


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

    // DELETE ORDER
    export const deleteOrder = async (id: number) => {
        try {
            await axios.delete(`${ORDERS_URL}/${id}`);
        } catch (error) {
            console.log(error)
            throw error;
        }
    }