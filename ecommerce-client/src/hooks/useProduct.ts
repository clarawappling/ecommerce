import { useState } from "react"
import { Product } from "../models/Product"
import { fetchProducts } from "../services/productService";

export const useProduct = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const fetchProductsHandler = async () => {
        setIsLoading(true);

        try {
            const data = await fetchProducts();
            setProducts(data)
        } catch (error) {
            setError ("Error getting products");
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    return { 
        products, 
        isLoading, 
        error, 
        fetchProductsHandler 
    }
}