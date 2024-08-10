import { useState, useEffect } from "react";
import Header from "./components/Header";
import GuitarLA from "./components/Guitar";
import { db } from "./data/db";

function App() {
  const initialCart = () => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };
  //state, UseState
  const [data] = useState(db);
  const [cart, setCart] = useState(initialCart);

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

  return (
    <>
      <Header
        cart={cart}
        removeCart={removeCart}
        changeQuantity={changeQuantity}
        setCart={setCart}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((item) => (
            <GuitarLA
              key={item.id}
              guitar={item}
              setCart={setCart}
              addToCart={addToCart}
            />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
            <br />
            <span style={{ fontSize: "1.2rem" }}>
              Con amor <span style={{ color: "red" }}>❤️</span> hecho por Iván
            </span>
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
