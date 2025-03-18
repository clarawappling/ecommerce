
// import { CartItem } from "../models/CartItem";

// export interface ICartAction {
//     type: CartActionType;
//     payload: CartItem | any;
// }

// export enum CartActionType {
// ADD_ITEM,
// REMOVE_ITEM,
// CHANGE_QUANTITY,
// RESET_CART
// }

// export const CartReducer = (cart: CartItem[], action: ICartAction) => {
//     const {payload, type} = action;

//     switch(type) {
//         case CartActionType.ADD_ITEM: {
//             const itemExists = cart.find((item) => item.product.id === payload.product.id);
//             if(!itemExists) return [...cart, payload];

//             return cart.map((item) => (
//                 item.product.id === payload.product.id 
//                 ? {...item, quantity: item.quantity + payload.quantity}
//                 : item
//             ))
        
//         }
//         case CartActionType.REMOVE_ITEM: {
//             return;  
//         }
//         case CartActionType.CHANGE_QUANTITY:
//         {
//             return;
//         }
//         case CartActionType.RESET_CART: {
//             return;
//         }
//         default: {
//             return cart;
//         }
//     }
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
import { CartItem } from "../models/CartItem";


export interface ICartAction {
  type: CartActionType;
  payload: CartItem | any;
}


export enum CartActionType  {
  ADD_ITEM,
  REMOVE_ITEM,
  CHANGE_QUANTITY,
  RESET_CART
}

export const CartReducer = (cart: CartItem[], action: ICartAction) => {
  const {payload, type} = action;

  switch(type) {
    case CartActionType.ADD_ITEM: {
      /**
       If CartItem exists in cart, update the quantity
       Else add new cartItem to the cart
      */
      const itemExists = cart.find((item) => item.product.id === payload.product.id)

      // add new item to the cart
      if (!itemExists) return [...cart, payload];

      // Uppdate quantity of exisiting item in the cart
      return cart.map((item) => (
        item.product.id === payload.product.id 
          ? {...item, quantity: item.quantity + payload.quantity}
          : item
      ))
    }
    
    case CartActionType.REMOVE_ITEM: {
      return cart.filter((item) => item.product.id !== payload.product.id);
    }
    
    case CartActionType.CHANGE_QUANTITY: {
      return cart.map((item) => {
        if (item.product.id === payload.product.id ) {
          const totalQuantity = item.quantity + (payload.quantity)
          return {...item, quantity: totalQuantity > 0 ? totalQuantity : 1}
        }

        return item;
      })
    }
    
    case CartActionType.RESET_CART:
      return [];
    
    default:
      return cart;
  }
}