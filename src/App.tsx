import { useEffect } from "react";
import Header from "./components/Header";
import GuitarLA from "./components/Guitar";
import { useCarts } from "./hooks/useCarts";

export default function App() {
  const { state } = useCarts();

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <>
      <Header />;
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {state.data.map((item) => (
            <GuitarLA key={item.id} guitar={item} />
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
