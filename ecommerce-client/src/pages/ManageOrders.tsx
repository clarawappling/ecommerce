import { useEffect } from "react"
import { useOrder } from "../hooks/useOrder"
import { NavigationAdmin } from "../components/NavigationAdmin";
import "../styles/ManageOrders.css"

export const ManageOrders = () => {
    
    const {error, isLoading, orders, fetchOrdersHandler, deleteOrderHandler} = useOrder();
    
    useEffect(() => {
        fetchOrdersHandler();
    }, [])

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
                                <p>{order.id}</p>
                                <p>{order.customer_firstname} {order.customer_lastname}</p>
                                <p>{order.total_price}</p>
                                <p>{order.order_status}</p>
                                <p>{order.payment_status}</p>
                                <button onClick={() => {deleteOrderHandler(order.id)}}>Ta bort</button>
                                <button>Uppdatera order</button>
                            </article>
                        ))
                    }
                </div>
            </div>
        </>
    )
}