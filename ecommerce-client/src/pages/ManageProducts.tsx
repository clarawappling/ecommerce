import { useEffect } from "react";
import { useProduct } from "../hooks/useProduct"
import "../styles/ManageProducts.css"
import { useNavigate } from "react-router";
import { NavigationAdmin } from "../components/NavigationAdmin";

export const ManageProducts = () => {
    const navigate = useNavigate();
    
    const {products, isLoading, error, fetchProductsHandler, deleteProductHandler} = useProduct();

    useEffect (() => {
        fetchProductsHandler();
    }, [])

    const handleClick = (id: number) => {
        navigate("/admin/update-product/"+id);
    }

    const handleCreate = () => {
        navigate("/admin/create-product")
    }
    if (isLoading) return <p>Loading..</p>
    if (error) return <p>{error}</p>
    return (
<>
        <div>
            <h1>Produktlista</h1>
            <button onClick={handleCreate}>Lägg till produkt</button>
            <div className="product-list">
                {
                    products.map((product) => (
                        <article className="product-item" key={product.id}>
                            <p>{product.name}</p>
                            <p>{product.price} SEK</p>
                            <p>{product.stock} st</p>
                            <button onClick={() => {deleteProductHandler(product.id)}}>Ta bort</button>
                            <button onClick={() => {handleClick(product.id)}}>Uppdatera produkt</button>
                    
                        </article>
                    )
                    )
                }
            </div>
        </div>
        <NavigationAdmin />
        </>
    )
}