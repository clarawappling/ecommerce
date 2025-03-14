import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { Product } from "../models/Product";
import { useProduct } from "../hooks/useProduct";
import "../styles/ShowProducts.css"
import "../styles/ProductDetails.css"

export const ProductDetails = () => {
    const params = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const {fetchProductByIdHandler, error, isLoading} = useProduct();

    useEffect(() => {
        if(!params.id) return;
        const idAsNumber = +params.id
        fetchProductByIdHandler(idAsNumber).then((data) => setProduct(data));
    }, [])
    
    return (
        <>
         <div className="product-customer-item" id="product-customer-item" key={product?.id}>
         <h2 className="product-name">{product?.name}</h2>
                            <img className="product-image" id="product-image" src={product?.image} />
                            <p className="product-price">{product?.price} SEK</p>
                            <p className="product-description">{product?.description}</p>
                            <i>Kategori: {product?.category}</i>
                            <p>Lagersaldo: {product?.stock}</p>
                            <button>Lägg i varukorg</button>
                            
                        </div>
        </>
    )
}