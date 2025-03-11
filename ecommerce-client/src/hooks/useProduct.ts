import { useState } from "react"
import { Product, ProductUpdate } from "../models/Product"
import { deleteProduct, fetchProductById, fetchProducts, updateProductByID } from "../services/productService";

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

    const fetchProductByIdHandler = async (id: number) => {
        setIsLoading(true)
        
        try {
            return await fetchProductById(id);
        } catch (error) {
            setError("Error getting product")
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    const updateProductHandler = async (id: number, payload: ProductUpdate) => {
        try {
            await updateProductByID(id, payload)
        } catch (error) {
            setError("Error updating product");
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    const deleteProductHandler = async (id: number) => {
        setIsLoading(true);
        try {
            await deleteProduct(id);
            const newList = products.filter(product => product.id !== id);
            setProducts(newList);
        } catch (error) {
            setError("Error deleting product");
            throw error;
        } finally {
            setIsLoading(false);
        }
    } 
    return { 
        products, 
        isLoading, 
        error, 
        fetchProductsHandler,
        deleteProductHandler,
        fetchProductByIdHandler,
        updateProductHandler
    }
}