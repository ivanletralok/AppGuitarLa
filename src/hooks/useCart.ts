import { useState, useEffect } from "react";
import { useMemo } from "react";

import { db } from "../data/db";
import { GuitarLa } from "../interface/guitarla";

export const useCart = () => {
  const initialCart = (): GuitarLa[] => {
    const localStorageCart = localStorage.getItem("car");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };
  //state, UseState
  const [data] = useState(db);
  const [cart, setCart] = useState(initialCart);
  const totalPay = useMemo(
    () =>
      cart.reduce(
        (acc: number, item: GuitarLa) =>
          acc + item.price * (item.quantity ?? 0),
        0,
      ),
    [cart],
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(item: GuitarLa): void {
    const itemExist = cart.some((cart: GuitarLa) => cart.id === item.id);
    if (!itemExist) {
      item.quantity = 1;
      setCart([...cart, item]);
    } else {
      const updatedCart = cart.map((cartItem: GuitarLa) => {
        if (cartItem.id === item.id) {
          if (cartItem.quantity === 5) return cartItem;
          return { ...cartItem, quantity: (cartItem.quantity ?? 0) + 1 };
        }
        return cartItem;
      });
      setCart(updatedCart);
    }
  }

  function removeCart(id: number): void {
    setCart((item: GuitarLa[]) =>
      item.filter((item: GuitarLa) => item.id !== id),
    );
  }

  function changeQuantity(id: number, operation: string): void {
    const cartCopy = [...cart];
    const operationType = operation === "+" ? true : false;

    cartCopy.map((item) => {
      if (item.id === id) {
        if (item.quantity && item.quantity > 4 && operationType) return;
        if (!operationType && item.quantity === 1) return;
        return {
          ...item,
          quantity: operationType
            ? item.quantity
              ? item.quantity + 1
              : 1
            : item.quantity
              ? item.quantity - 1
              : 0,
        };
      }
      return item;
    });
    setCart(cartCopy);
  }

  return {
    data,
    cart,
    addToCart,
    removeCart,
    changeQuantity,
    setCart,
    totalPay,
  };
};
