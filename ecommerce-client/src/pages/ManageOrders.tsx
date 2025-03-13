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
            <NavigationAdmin />
            <div>
                <h2>Orderlista</h2>
                <div className="order-list">
                    {
                        orders.map((order) => (
                            <article className="order-item" key={order.id}>
                                <Link to={`/admin/detailed-order/${order.id}`}> {order.id} </Link>
                                <p>{order.customer_firstname} {order.customer_lastname}</p>
                                <p>{order.total_price}</p>
                                <p>{order.order_status}</p>
                                <button onClick={() => {deleteOrderHandler(order.id)}}>Ta bort</button>
                                <button onClick={() => {handleClick(order.id)}}>Ändra orderstatus</button>
                            </article>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

