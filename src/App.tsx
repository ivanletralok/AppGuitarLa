import Header from "./components/Header";
import GuitarLA from "./components/Guitar";
import { useCart } from "./hooks/useCart";

export default function App() {
  const {
    data,
    cart,
    addToCart,
    removeCart,
    changeQuantity,
    setCart,
    totalPay,
  } = useCart();

  return (
    <>
      <Header
        cart={cart}
        removeCart={removeCart}
        changeQuantity={changeQuantity}
        setCart={setCart}
        totalPay={totalPay}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((item) => (
            <GuitarLA key={item.id} guitar={item} addToCart={addToCart} />
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
