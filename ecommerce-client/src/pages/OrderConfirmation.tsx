import { useEffect, useState } from "react";
import { useLocation } from "react-router"
import { useOrder } from "../hooks/useOrder";

export const OrderConfirmation = () => {
    const location = useLocation();

    // Hoppa över statet? Kommer inte hinna sättas i useEffecten. Sätt order-infon sen istället.
    const [paymentId, setPaymentId] = useState<string |null>(null);
    const {fetchOrderByPaymentIdHandler} = useOrder();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const paymentIdQuery = queryParams.get('session_id');
        // Hoppa över statet? Kommer inte hinna sättas i useEffecten
        setPaymentId(paymentIdQuery);

        const getOrderBySessionId = async () => {
            if(paymentIdQuery) {
                const order =  await fetchOrderByPaymentIdHandler(paymentIdQuery)
                console.log(order)
            }
           
        } 
        getOrderBySessionId();
    }, [location.search])


    
    return (
        <>
        <h1>Orderbekräftelse</h1>
        <p>{paymentId}</p>
        </>
    )
}