import { useEffect } from "react";
import { useProduct } from "../hooks/useProduct"
import "../styles/ManageProducts.css"
import { useNavigate } from "react-router";

export const ManageProducts = () => {
    const navigate = useNavigate();
    
    const {products, isLoading, error, fetchProductsHandler, deleteProductHandler} = useProduct();

    useEffect (() => {
        fetchProductsHandler();
    }, [])

    const handleClick = (id: number) => {
        navigate("/admin/update-product/"+id);
    }

    if (isLoading) return <p>Loading..</p>
    if (error) return <p>{error}</p>
    return (
        <div>
            <h2>Produktlista</h2>
            <div className="product-list">
                {
                    products.map((product) => (
                        <article className="product-item">
                            <p>{product.name}</p>
                            <p>{product.description}</p>
                            <p>{product.price}</p>
                            <p>{product.stock}</p>
                            <button onClick={() => {deleteProductHandler(product.id)}}>Ta bort</button>
                            <button onClick={() => {handleClick(product.id)}}>Uppdatera produkt</button>
                    
                        </article>
                    )
                    )
                }
            </div>
         
        </div>
    )
}