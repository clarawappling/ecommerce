import { useContext } from "react"
import CartContext from "../contexts/CartContext"
import { CartActionType } from "../reducers/CartReducer"

export const Checkout = () => {

    const {cart, dispatch} = useContext(CartContext)

    const handleEmptyCart = () => {
        dispatch ({
            type: CartActionType.RESET_CART,
            payload: {}
        })
    }

    return (
    <>
    <div className="cart-container">
    {JSON.stringify(cart)}
    </div>
    <button onClick={handleEmptyCart}>Töm varukorg</button>
    </>
)
}