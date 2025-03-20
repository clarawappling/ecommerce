import { Cart } from "../components/Cart"
import * as React from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import CartContext from "../contexts/CartContext";

const stripePromise = loadStripe('pk_test_51R4JflEUcfJR78A9I4729RJfcSNRKqB9njUYAcAAmJTLHAsbn8xWDNaakNUUyvbP2dHDE0UisUraA1GgHnwmmg1F00aCscjeAl')

export const Checkout = () => {

    const {cart} = React.useContext(CartContext)
    
    
    const fetchClientSecret = React.useCallback(() => {
    
        return fetch("http://localhost:3000/stripe/create-checkout-session-embedded", {
          method: "POST",
        })
          .then((res) => res.json())
          .then((data) => data.clientSecret);
      }, []);
    
      const options = {fetchClientSecret};
    
    return (
        <>
        <h1>Checkout</h1>
        <h2>Varukorg</h2>
        <Cart/>
{
  cart.length > 0 && (
  <div id="stripe-container">
  <EmbeddedCheckoutProvider
      stripe={stripePromise}
      options={options}
    >
      <EmbeddedCheckout />
    </EmbeddedCheckoutProvider>
    </div>

)}
      
        </>
    )
}