import {  useEffect } from "react"
import { useOrder } from "../hooks/useOrder"
import { NavigationAdmin } from "../components/NavigationAdmin";
import "../styles/ManageOrders.css"
import { Link, useNavigate } from "react-router";

export const ManageOrders = () => {

    const navigate = useNavigate();
    
    const {error, isLoading, orders, fetchOrdersHandler, deleteOrderHandler} = useOrder();

    useEffect(() => {
        fetchOrdersHandler();
    }, []);


    const handleClick = (id: number) => {
        navigate("/admin/update-order-status/" + id);
    }


    if (isLoading) return <p>Loading..</p>
    if (error) return <p>{error}</p>

    return (
        <>
            <div>
                <h1>Orderlista</h1>
                <div className="order-list">
                    {
                        orders.map((order) => (
                            <article className="order-item" key={order.id}>
                                <Link className="order-link" to={`/admin/detailed-order/${order.id}`}> Order-id: {order.id}, {order.customer_firstname} {order.customer_lastname}</Link>
                                <p>Totalt: {order.total_price} SEK</p>
                                <p>Status: {order.order_status}</p> 
                                <button onClick={() => {deleteOrderHandler(order.id)}}>Ta bort</button>
                                <button onClick={() => {handleClick(order.id)}}>Ändra orderstatus</button>
                            </article>
                        ))
                    }
                </div>
            </div>
            <NavigationAdmin />
        </>
    )
}

