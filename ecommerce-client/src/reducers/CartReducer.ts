import { CartItem } from "../models/CartItem";

export interface ICartAction {
    type: CartActionType;
    payload: CartItem;
}

export enum CartActionType {
ADD_ITEM,
REMOVE_ITEM,
CHANGE_QUANTITY,
RESET_CART
}

export const CartReducer = (cart: CartItem[], action: ICartAction) => {
    const {payload, type} = action;

    switch(type) {
        case CartActionType.ADD_ITEM: {
            const itemExists = cart.find((item) => item.product.id === payload.product.id);
            if(!itemExists) return [...cart, payload];

            return cart.map((item) => (
                item.product.id === payload.product.id 
                ? {...item, quantity: item.quantity + payload.quantity}
                : item
            ))
        
        }
        case CartActionType.REMOVE_ITEM: {
            return;  
        }
        case CartActionType.CHANGE_QUANTITY:
        {
            return;
        }
        case CartActionType.RESET_CART: {
            return;
        }
        default: {
            return cart;
        }
    }
}