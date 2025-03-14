import { useEffect } from "react";
import { useProduct } from "../hooks/useProduct"
import "../styles/ShowProducts.css"
import { useNavigate } from "react-router";

export const ShowProducts = () => {
   
   const {products, fetchProductsHandler, error, isLoading} = useProduct();
   const navigate = useNavigate();
    
     useEffect (() => {
           fetchProductsHandler();
       }, [])

       const handleClick =(id: number) => {
        navigate("/product/" + id)
       }
   
       if(isLoading) return <p>Loading..</p>
       if(error) return <p>{error}</p>

   return (
        <>
        
        <div className="product-container-wrapper">
            <h1>Sortiment</h1>
           
            <div className="product-customer-list">
                {
                    products.map((product) => (
                        <div className="product-customer-item" key={product.id} onClick={() => handleClick(product.id)}>
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