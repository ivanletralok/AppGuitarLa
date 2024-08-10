import { useState, useEffect } from "react";
import { useMemo } from "react";

import { db } from "../data/db";

export const useCart = () => {
  const initialCart = () => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };
  //state, UseState
  const [data] = useState(db);
  const [cart, setCart] = useState(initialCart);
  const totalPay = useMemo(
    () => cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cart],
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(item) {
    const itemExist = cart.some((cart) => cart.id === item.id);
    if (!itemExist) {
      item.quantity = 1;
      setCart([...cart, item]);
    } else {
      const updateCarr = [...cart];
      if (item.quantity === 5) return;
      updateCarr.quantity = item.quantity++;
      setCart(updateCarr);
    }
  }

  function removeCart(id) {
    setCart((item) => item.filter((item) => item.id !== id));
  }

  function changeQuantity(id, operation) {
    const cartCopy = [...cart];
    const operationType = operation === "+" ? true : false;

    cartCopy.map((item) => {
      if (item.id === id) {
        if (item.quantity > 4 && operationType) return;
        if (!operationType && item.quantity === 1) return;
        return {
          ...item,
          quantity: operationType ? item.quantity++ : item.quantity--,
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
