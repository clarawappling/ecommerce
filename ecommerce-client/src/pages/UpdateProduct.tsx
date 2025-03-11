import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { Product } from "../models/Product"
import { useNavigate, useParams } from "react-router";
import { useProduct } from "../hooks/useProduct";
import "../styles/UpdateProduct.css"

export const UpdateProduct = () => {
    
    const [product, setProduct] = useState<Product | null>(null);
    const params = useParams();
    const {isLoading, error, fetchProductByIdHandler, updateProductHandler} = useProduct();
    const navigate = useNavigate();

    useEffect(() => {
        if(!params.id) return;
        const idAsNumber = +params.id;
        fetchProductByIdHandler(idAsNumber).then((data) => setProduct(data));
    }, []
)

const handleChange= (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if(!product) return;
    if(e.target.type === "number") {
        setProduct({...product, [e.currentTarget.name]: +e.currentTarget.value})
    } else {
        setProduct({...product, [e.currentTarget.name]: e.currentTarget.value})
    }
}

const handleSubmit = async (e:FormEvent) => {
    e.preventDefault()
    if(!product) return;
    await updateProductHandler(product.id, {
        name: product.name, 
        description: product.description,
        stock: product.stock,
        price: product.price,
        category: product.category,
        image: product.image
    })
    navigate("/admin/products")
}

     if(isLoading) return <p>Loading..</p>
     if(error) return <p>{error}</p>

    return (
        <>
            <div className="product-container">
                <h2>Uppdatera produkt</h2>
                <form onSubmit={handleSubmit}>
                <label htmlFor="name">Namn:</label>
                <input
                    name="name"
                    id="name"
                    value={product?.name ?? ''}
                    onChange={(e) => {handleChange(e)}}

                  />
                  <label htmlFor="description">Beskrivning:</label>
                  <textarea
                    name="description"
                    id="description"
                    value={product?.description ?? ''}
                    onChange={(e) => {handleChange(e)}}
                  />
                  <label htmlFor="price">Pris:</label>
                  <input
                  type="number"
                  name="price"
                  id="price"
                  value={product?.price ?? ''}
                  onChange={(e) => {handleChange(e)}}

                  />
                  <label htmlFor="stock">I lager:</label>
                  <input
                  type="number"
                  name="stock"
                  id="stock"
                  value={product?.stock ?? ''}
                  onChange={(e) => {handleChange(e)}}

                  />
                  <label htmlFor="image">Bildlänk:</label>
                  <input
                    name="image"
                    id="image"
                    value={product?.image ?? ''}
                    onChange={(e) => {handleChange(e)}}
                    />
                   <label htmlFor="category">Välj kategori:</label>
                        <select id="category" name="category">
                        <option value="Kläder">Kläder</option>
                        <option value="Prydnader">Prydnader</option>
                        <option value="Teknik">Teknik</option>
                        </select>
                        <button>Uppdatera</button>

                </form>
            </div>
        </>
    )
}