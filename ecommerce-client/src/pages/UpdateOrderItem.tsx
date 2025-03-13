import { FormEvent, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { OrderItemUpdate } from "../models/OrderItem"
import { useOrderItem } from "../hooks/useOrderItem"
import { NavigationAdmin } from "../components/NavigationAdmin"

export const UpdateOrderItem = () => {
    const params = useParams()
    const navigate = useNavigate();
    const quantity = Number(params.quantity);
    const id = Number(params.id);
    const productName = params.product_name

    const [orderItem, setOrderItem] = useState<OrderItemUpdate>({quantity: quantity})
    const  {updateOrderItemHandler, error, isLoading} = useOrderItem(); 
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOrderItem({...orderItem, [e.target.name]: e.target.value })
    }

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        navigate("/admin/detailed-order/" + id);
    }

    const handleSubmit = async (e: FormEvent) =>  {
        e.preventDefault();
        await updateOrderItemHandler(id, {quantity: orderItem.quantity})
        navigate("/admin/detailed-order/" + id)
    }

    if(isLoading) return <p>Loading..</p>
    if(error) return <p>{error}</p>

    return (
        <>
        <NavigationAdmin />
        <div className="update-order-item-container">
            <h3>{productName}</h3>
            <form onSubmit={handleSubmit}>
            <label htmlFor="quantity">Antal: </label>
            <input
                name="quantity"
                id="quantity"
                value={orderItem.quantity}
                onChange={(e) => {handleChange(e) }}
            />
            <button>Spara</button>
            <button onClick={(e) => {handleClick(e)}}>Avbryt</button>
            </form>
        </div>
    
        </>
    )
}