import { useContext } from "react"
import CartContext from "../contexts/CartContext"

export const Checkout = () => {

    const {cart, dispatch} = useContext(CartContext)

    return (
    <>
    <div className="cart-container">
    {JSON.stringify(cart)}
    </div>
    </>
)
}