import { useEffect, useState } from "react";
import { useLocation } from "react-router"

export const OrderConfirmation = () => {
    const location = useLocation();

    // Hoppa över statet? Kommer inte hinna sättas i useEffecten. Sätt order-infon sen istället.
    const [paymentId, setPaymentId] = useState<string |null>(null);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const paymentIdQuery = queryParams.get('session_id');
        // Hoppa över statet? Kommer inte hinna sättas i useEffecten
        setPaymentId(paymentIdQuery);
    }, [location.search])


    
    return (
        <>
        <h1>Orderbekräftelse</h1>
        
        </>
    )
}