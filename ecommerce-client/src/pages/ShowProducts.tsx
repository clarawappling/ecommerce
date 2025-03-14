import { useEffect } from "react";
import { useProduct } from "../hooks/useProduct"
import "../styles/ShowProducts.css"

export const ShowProducts = () => {
   
   const {products, fetchProductsHandler, error, isLoading} = useProduct();
    
     useEffect (() => {
           fetchProductsHandler();
       }, [])
   
   return (
        <>
        
        <div className="product-container-wrapper">
            <h2>Sortiment</h2>
           
            <div className="product-customer-list">
                {
                    products.map((product) => (
                        <div className="product-customer-item" key={product.id}>
                            <img className="product-image" src={product.image} />
                            <p className="product-name ">{product.name}</p>
                            <p className="product-description">{product.description}</p>
                            <p className="product-price">{product.price} SEK</p>
                        </div>
                    )
                    )
                }
            </div>
        </div>
        </>
    )
}