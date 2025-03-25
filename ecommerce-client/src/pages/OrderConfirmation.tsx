import { useEffect, useState } from "react";
import { useLocation } from "react-router"
import { useOrder } from "../hooks/useOrder";
import { DetailedOrder } from "../models/Order";
import "../styles/OrderConfirmation.css"

export const OrderConfirmation = () => {
    const location = useLocation();


    const [paymentId, setPaymentId] = useState<string |null>(null);
    const {fetchOrderByPaymentIdHandler} = useOrder();
    const [order, setOrder] = useState <DetailedOrder | null> (null)

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const paymentIdQuery = queryParams.get('session_id');
        // Hoppa över statet? Kommer inte hinna sättas i useEffecten
        setPaymentId(paymentIdQuery);

        const getOrderBySessionId = async () => {
            if(paymentIdQuery) {
                const data =  await fetchOrderByPaymentIdHandler(paymentIdQuery)
                setOrder(data)
                console.log(order)
            }
           
        } 
        getOrderBySessionId();
    }, [location.search])


    // Loading spinner
    return (
        <>
        {/* Villkor order hämtad */}
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