import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router"
import { useOrder } from "../hooks/useOrder";
import { DetailedOrder } from "../models/Order";
import "../styles/OrderConfirmation.css"
import CartContext from "../contexts/CartContext";
import { CartActionType } from "../reducers/CartReducer";

export const OrderConfirmation = () => {
    const location = useLocation();

    const {fetchOrderByPaymentIdHandler} = useOrder();
    const [order, setOrder] = useState <DetailedOrder | null> (null);
    const {dispatch} = useContext(CartContext);


    const handleEmptyCart = () => {
            dispatch ({
                type: CartActionType.RESET_CART,
                payload: null
            })
        }
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const paymentIdQuery = queryParams.get('session_id');

        const getOrderBySessionId = async () => {
            if(paymentIdQuery) {
                const data =  await fetchOrderByPaymentIdHandler(paymentIdQuery)
                setOrder(data)
                console.log(order)
            }
           
        } 
        getOrderBySessionId();

    }, [location.search])

    useEffect (() => {
        handleEmptyCart()
        localStorage.removeItem('customer');
    }, [])


    // Add loading spinner
    
    return (
        <>
        {/* Lägg till villkor order hämtad? */}
        <h1>Orderbekräftelse</h1>
        <p>Tack för din beställning, {order?.customer_firstname}! 
        Vi är så glada över att du valt att handla hos oss.</p> <p>Nedan hittar du en sammanfattning av den order som är på väg hem till dig.</p>
        
            <h2>Orderdetaljer</h2>
            <div className="order-details-container">
            {order?.order_items.map((item) => {
                return (
                    <div key={item.id} className="order-item">
                    <h4>{item.product_name}</h4>
                    <p>Antal: {item.quantity} st</p>
                    <p>á pris: {item.unit_price} SEK</p>
                    <p>Totalt pris: {item.quantity * item.unit_price} SEK</p>
                    </div>
                )
            })}
            </div>
            <h3>Total ordersumma: {order?.total_price} SEK</h3>
        
        </>
    )
}