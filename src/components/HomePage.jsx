import Carousel from "./Carousel";
import FunFactSection from "./FunFact";
import axios from "axios";
import GlobalContext from "../contexts/globalcontext";
import { useContext, useEffect, useState } from "react";
import SnakeCard from "./SnakeCard";

export default function HomePage() {
  const { setIsLoading } = useContext(GlobalContext);
  const [discountedSnakes, setDiscountedSnakes] = useState([]);
  const [newBornSnakes, setNewBornSnakes] = useState([]);
  const [discount, setDiscount] = useState(null);

  useEffect(() => {
    getDiscountedSnakes();
    getNewBornSnakes();
  }, []);

  function getDiscountedSnakes() {
    setIsLoading(true);
    axios.get("http://127.0.0.1:3000/api/snakes", {
      params: {
        discount: discount !== 0,
      },
    })
      .then((res) => setDiscountedSnakes(res.data))
      .catch((err) => console.error("Errore:", err))
      .finally(() => setIsLoading(false));
  }

  function getNewBornSnakes() {
    setIsLoading(true);
    axios.get("http://127.0.0.1:3000/api/snakes", {
      params: {
        sort: "birth",
      },
    })
      .then((res) => setNewBornSnakes(res.data))
      .catch((err) => console.error("Errore:", err))
      .finally(() => setIsLoading(false));
  }

  return (
    <>
      {/* Sezione Benvenuto */}
      <div className="container-fluid py-4">
        <div className="bg-dark bg-opacity-75 text-white text-center px-5 py-4 rounded-4 mx-auto w-100 mb-4">
          <h2>Benvenuto su <strong>Sergente Serpente!</strong></h2>
          <p className="mt-3">
            Sei nel posto giusto per scoprire il fascino ineguagliabile di questi magnifici rettili.
            Qui a Sergente Serpente, ti offriamo una selezione curata di serpenti,
            allevati con passione e dedizione per garantirti esemplari sani, robusti e unici.
          </p>
          <a href="/snakes" className="btn btnblog mt-3">Scopri i nostri esemplari</a>
        </div>
      </div>

      {/* Carosello centrato e più largo */}
      <div className="container-fluid px-0 mb-5 d-flex justify-content-center">
        <Carousel />
      </div>

      {/* Griglia serpenti in sconto */}
      <div className="container w-100 mb-5 py-2">
        <h2 className="text-center text-white mb-4">Serpenti in sconto!</h2>
        <div className="row">
          {discountedSnakes?.map((snake) => (
            <div className="col-12 col-md-6 col-lg-4 mb-4" key={snake.id}>
              <SnakeCard data={snake} />
            </div>
          ))}
        </div>
      </div>

      {/* Griglia nascite */}
      <div className="container w-100 mb-5 py-2">
        <h2 className="text-center text-white mb-4">Nascite recenti</h2>
        <div className="row">
          {newBornSnakes?.slice(0, 6).map((snake) => (
            <div className="col-12 col-md-6 col-lg-4 mb-4" key={snake.id}>
              <SnakeCard data={snake} />
            </div>
          ))}
        </div>
      </div>

      {/* Sezione FunFact */}
      <div className="container w-100 mb-3 py-2 bg-dark bg-opacity-75 text-white rounded-4">
        <h2 className="text-center">Scopri curiosità sui serpenti</h2>
      </div>
      <FunFactSection />
    </>
  );
}
