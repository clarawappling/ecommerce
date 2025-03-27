import axios from "axios"
import { Product, ProductCreate, ProductUpdate } from "../models/Product"

const PRODUCTS_URL = "http://localhost:3000/products"


// GET ALL PRODUCTS
export const fetchProducts = async (): Promise<Product[]> => {
    try {
        const response = await axios.get<Product[]>(`${PRODUCTS_URL}`);
        return response.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
} 

// GET SPECIFIC PRODUCT
export const fetchProductById = async (id: number): Promise<Product> => {
    try {
        const response = await axios.get(`${PRODUCTS_URL}/${id}`)
        return response.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

// CREATE PRODUCT
export const createProduct = async (payload: ProductCreate) => {
    try {
        await axios.post(`${PRODUCTS_URL}`, payload)
    } catch (error) {
        console.log(error)
        throw error;
    }

}

// UPDATE PRODUCT
export const updateProductByID = async (id: number, payload: ProductUpdate) => {
    try {
        await axios.patch(`${PRODUCTS_URL}/${id}`, payload);
    } catch (error) {
        console.log(error)
        throw error;
    }
}


// DELETE PRODUCT
export const deleteProduct = async (id: number) => {
    try {
        await axios.delete(`${PRODUCTS_URL}/${id}`)
    } catch (error){
        console.log(error);
        throw error;
    }
}