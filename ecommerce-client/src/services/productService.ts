import axios from "axios"
import { Product } from "../models/Product"

const API_URL = "http://localhost:3000"

export const fetchProducts = async () => {
    try {
        const response = await axios.get<Product[]>(`${API_URL}/products`);
        return response.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
} 