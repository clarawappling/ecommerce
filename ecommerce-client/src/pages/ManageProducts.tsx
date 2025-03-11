import { useEffect } from "react";
import { useProduct } from "../hooks/useProduct"

export const ManageProducts = () => {
    
    const {products, isLoading, error, fetchProductsHandler} = useProduct();

    useEffect (() => {
        fetchProductsHandler();
    }, [])

    if (isLoading) return <p>Loading..</p>
    if (error) return <p>{error}</p>
    return (
        <div>
            <h2>Produktlista</h2>
            <div className="product-list">
                {
                    products.map((product) => (
                        <article className="prouct-item">
                            <p>{product.name}</p>
                        </article>
                    )
                    )
                }
            </div>
         
        </div>
    )
}