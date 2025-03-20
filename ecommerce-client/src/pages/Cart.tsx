import { useContext } from "react"
import CartContext from "../contexts/CartContext"
import { CartActionType } from "../reducers/CartReducer"
import "../styles/Cart.css"
import { Product } from "../models/Product"
import { CartItem } from "../models/CartItem"

import * as React from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51R4JflEUcfJR78A9I4729RJfcSNRKqB9njUYAcAAmJTLHAsbn8xWDNaakNUUyvbP2dHDE0UisUraA1GgHnwmmg1F00aCscjeAl')
export const Cart = () => {

    const {cart, dispatch} = useContext(CartContext)

    const handleChangeQuantity = (product: Product, quantity: number) => {
        dispatch({
            type: CartActionType.CHANGE_QUANTITY,
            payload: new CartItem(product, quantity)
        })}

        const handleRemoveFromCart = (cartItem: CartItem) => {
            dispatch({
                type: CartActionType.REMOVE_ITEM,
                payload: cartItem
            })
        }
    
    const handleEmptyCart = () => {
        dispatch ({
            type: CartActionType.RESET_CART,
            payload: null
        })
    }

    const totalPrice = cart.reduce( (total, item: CartItem) => (
        total + (item.quantity * item.product.price )
    ), 0 )


    const fetchClientSecret = React.useCallback(() => {
        // Create a Checkout Session
        return fetch("http://localhost:3000/stripe/create-checkout-session-embedded", {
          method: "POST",
        })
          .then((res) => res.json())
          .then((data) => data.clientSecret);
      }, []);
    
      const options = {fetchClientSecret};

    return (
    <>
   
    <div className="cart-container">
    <h1>Varukorg</h1>
    <ul className="cart-list">
    {cart.map((item) => (
       
       <li key={item.product.id}>
        <div className="cart-item">
            <h3>{item.product.name}</h3>
            <div>
            <img src={item.product.image}/>
            </div>
            
            <span>{item.product.price} SEK</span>
            <span className="multiplier"> x </span>
            <span>{item.quantity}</span>
            <div className="quantity-adjustment">
                <button onClick={() => handleChangeQuantity(item.product, -1)}>-</button>
                <button onClick={() => handleChangeQuantity(item.product, 1)}>+</button>
            </div>
                <button onClick={() => handleRemoveFromCart (item)}>Ta bort</button>
        </div>
        </li>
            
        
    ))}
    </ul>
    <div className="total-sum-container">
        <p>{totalPrice ? "Att betala: " + totalPrice + " SEK" :  "Du har inga varor i din varukorg. Och vet du? Det är inte så dumt. Get out while you still can."}</p>
    </div>
    <button className="happy-btn">Till kassan</button>
    </div>
    <button className="alert-btn"onClick={handleEmptyCart}>Töm varukorg</button>
<div id="stripe-container">
    <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={options}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
      </div>
    </>
)
}