import axios from "axios";

const ORDER_ITEM_URL = "http://localhost:3000/order-items/"


// DELETE ORDER ITEM
export const deleteOrderItem = async (id: number) => {
    try {
        await axios.delete(ORDER_ITEM_URL + id)
    } catch(error) {
        console.log(error)
        throw error;
    }
}