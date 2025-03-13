import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { useOrder } from "../hooks/useOrder";
import { DetailedOrder } from "../models/Order";
import { NavigationAdmin } from "../components/NavigationAdmin";
import "../styles/OrderDetails.css";
import { useOrderItem } from "../hooks/useOrderItem";

export const OrderDetails = () => {
    
    const params = useParams();
    const {fetchOrderByIdHandler}= useOrder();
    const {deleteOrderItemHandler, error, isLoading} = useOrderItem();
    const [order, setOrder] = useState<DetailedOrder | null>(null);

    useEffect(() => {
      if(!params.id) return;
      const idAsNumber = +params.id;
      fetchOrderByIdHandler(idAsNumber).then((data) => setOrder(data))
    })

    if (isLoading) return <p>Loading..</p>
    if (error) return <p>{error}</p>

    return (
        <>
        <NavigationAdmin />
        <h2>Detaljerad orderinformation</h2>
        <h3>Kundinformation</h3>
        <p>{order?.customer_firstname} {order?.customer_lastname}</p>
        <p>{order?.customer_email}</p>
        <p>{order?.customer_phone}</p>
        <i>{order?.customer_street_address}, </i>
        <i>{order?.customer_city}</i>

        <h3>Orderdetaljer</h3>
        <p>Orderstatus: {order?.order_status}</p>
        <p>Betalning: {order?.payment_status}</p>
        <p>Summa: {order?.total_price} SEK</p>

        <h3>Produkter</h3>
        {order?.order_items.map((item) => {
          return (
            <div className="order-item" key={item.id}>
              <p>Produkt: {item.product_name}</p>
              <p>Antal beställda: {item.quantity}</p>
              <p>À pris: {item.unit_price}</p>
              <button onClick={() => deleteOrderItemHandler(item.id)}>Ta bort</button>
              <button>Uppdatera</button>
            </div>
          )
        })}
     
        
       
        
        
    
        </>
    )
}