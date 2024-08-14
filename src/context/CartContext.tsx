import { Dispatch, ReactNode, createContext, useReducer } from "react";
import {
  CarState,
  CartActions,
  cartReducer,
  initialState,
} from "../reducers/cart-reducer";

export type CartProviderProps = {
  children: ReactNode;
};

export type CartContextProps = {
  state: CarState;
  dispatch: Dispatch<CartActions>;
};

export const CartContext = createContext<CartContextProps>(
  {} as CartContextProps,
);

export const CartProvider = ({ children }: CartProviderProps) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
