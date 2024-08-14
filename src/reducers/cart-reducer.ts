import { CartItem, GuitarLa } from "./../interface/guitarla";
import { db } from "../data/db";

export type CartActions =
  | { type: "add-to-cart"; payload: { item: GuitarLa } }
  | { type: "remove-cart"; payload: { id: number } }
  | { type: "change-quantity"; payload: { id: number; operation: string } }
  | { type: "clear-cart" };

export interface CarState {
  data: GuitarLa[];
  cart: CartItem[];
}

const initialCart = (): CartItem[] => {
  const localStorageCart = localStorage.getItem("cart");
  return localStorageCart ? JSON.parse(localStorageCart) : [];
};

export const initialState: CarState = {
  data: db,
  cart: initialCart(),
};

export const cartReducer = (
  state: CarState = initialState,
  action: CartActions,
) => {
  if (action.type === "add-to-cart") {
    const itemExist = state.cart.find(
      (cart: CartItem) => cart.id === action.payload.item.id,
    );
    let updatedCart: CartItem[] = [];

    if (!itemExist) {
      const newItem: CartItem = { ...action.payload.item, quantity: 1 };
      updatedCart = [...state.cart, newItem];
    } else {
      updatedCart = state.cart.map((item) => {
        if (item.id === action.payload.item.id) {
          if (item.quantity < 5) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        } else {
          return item;
        }
      });
    }

    return {
      ...state,
      cart: updatedCart,
    };
  }

  if (action.type === "remove-cart") {
    return {
      ...state,
      cart: state.cart.filter((item) => item.id !== action.payload.id),
    };
  }

  if (action.type === "change-quantity") {
    const operationType = action.payload.operation === "+" ? true : false;

    const newItem = state.cart.map((item) => {
      if (item.id === action.payload.id) {
        if (item.quantity && item.quantity > 4 && operationType) return item;
        if (!operationType && item.quantity === 1) return item;
        if (item.quantity) {
          return {
            ...item,
            quantity: operationType ? item.quantity++ : item.quantity--,
          };
        }
      }
      return item;
    });

    return {
      ...state,
      cart: newItem,
    };
  }

  if (action.type === "clear-cart") {
    return {
      ...state,
      cart: [],
    };
  }
  return state;
};
