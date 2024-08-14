import { useContext } from "react";
import { CartContext, CartContextProps } from "../context/CartContext";

export const useCarts = () => {
  const context = useContext<CartContextProps>(CartContext);
  if (!context) {
    throw new Error("useCarts must be used within a CartProvider");
  }
  return context;
};
