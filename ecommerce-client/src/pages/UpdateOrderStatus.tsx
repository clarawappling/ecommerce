import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { DetailedOrder } from "../models/Order"
import { useNavigate, useParams } from "react-router";
import { useOrder } from "../hooks/useOrder";
import { formatDate } from "../utils/formatDate";
import { NavigationAdmin } from "../components/NavigationAdmin";

export const UpdateOrderStatus = () => {
    const [order, setOrder] = useState<DetailedOrder | null>(null);
    const params = useParams();
    const {isLoading, error, updateOrderStatusHandler, fetchOrderByIdHandler} = useOrder();
    const navigate = useNavigate();


        useEffect(() => {
            if(!params.id) return;
            const idAsNumber = +params.id;
            fetchOrderByIdHandler(idAsNumber).then((data) => setOrder(data));
        }, [] 
    )

    const handleChange = (e: ChangeEvent <HTMLInputElement | HTMLSelectElement>) => {
        if(!order!) return;

        const {name, value} = e.target;
        setOrder({...order, [name]: value})
    }

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        navigate("/admin/orders");
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if(!order) return;
        await updateOrderStatusHandler (order.id, {
            order_status: order.order_status,
            payment_status: order.payment_status,
            payment_id: order.payment_id
        })
        navigate("/admin/orders");
    }

    if(isLoading) return <p>Loading..</p>
    if(error) return <p>{error}</p>

    return (
        <>
        <NavigationAdmin />
        <div className="update-order-status-container">
            <h2>Uppdatera orderstatus</h2>
            <h4>{order?.customer_firstname} {order?.customer_lastname}, order-id: {order?.id}, Skapad: {order ? formatDate(order.created_at) : "" }</h4>
            <form onSubmit={handleSubmit}>
                <label htmlFor="order_status">Orderstatus: </label>
                <select name="order_status" id="order_status" value={order?.order_status ?? ''}onChange={(e) => {handleChange(e)}}>
                    <option value="paid">Paid</option>
                    <option value="processing">Processing</option>
                    <option value="unpaid">Unpaid</option>
                </select>
                <button>Spara</button>
                <button onClick={(e) => {handleClick(e)}}>Avbryt</button>
                
            </form>
            
        </div>
        </>
    )
}


