import axios from "axios"
import { Product } from "../models/Product"

const PRODUCTS_URL = "http://localhost:3000/products"

export const fetchProducts = async (): Promise<Product[]> => {
    try {
        const response = await axios.get<Product[]>(`${PRODUCTS_URL}`);
        return response.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
} 

export const fetchProductById = async (id: number): Promise<Product> => {
    try {
        const response = await axios.get(`${PRODUCTS_URL}/${id}`)
        return response.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export const deleteProduct = async (id: number) => {
    try {
        await axios.delete(`${PRODUCTS_URL}/${id}`)
    } catch (error){
        console.log(error);
        throw error;
    }
}