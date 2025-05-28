import { useContext, useEffect, useState } from "react";
import axios from "axios";
import GlobalContext from "../contexts/globalcontext";
import SnakeCard from "../components/SnakeCard";
import Jumbotron from "../components/Jumbotron";

const SnakesPage = () => {
  const [snakes, setSnakes] = useState([]);
  const [sort, setSort] = useState("name");
  const { setIsLoading } = useContext(GlobalContext);

  useEffect(() => {
    getSnakes();
  }, [sort]);

  function getSnakes() {
    setIsLoading(true);

    axios.get("http://127.0.0.1:3000/api/snakes", {
      params: { sort }
    })
      .then((response) => setSnakes(response.data))
      .catch((err) => console.error("Errore caricamento serpenti:", err))
      .finally(() => setIsLoading(false));
  }

  return (
    <>
      <Jumbotron />
      <header className="d-flex justify-content-between mb-3 align-items-center">
        <h1 className="text-light mb-4">Serpenti</h1>
      </header>

      <section>
        <div className="row mb-4">
          <div className="col-md-3">
            <select
              className="form-select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="name">Ordina per Nome (A-Z)</option>
              <option value="name_desc">Ordina per Nome (Z-A)</option>
              <option value="price">Ordina per Prezzo crescente</option>
              <option value="price_desc">Ordina per Prezzo decrescente</option>
            </select>
          </div>
        </div>

        <div className="row mt-4 h-100">
          {snakes.length > 0 ? (
            snakes.map((snake) => (
              <div className="col-12 col-md-6 col-lg-4 col-xl-3" key={snake.id}>
                <SnakeCard data={snake} />
              </div>
            ))
          ) : (
            <div className="text-light">Nessun serpente trovato.</div>
          )}
        </div>
      </section>
    </>
  );
};

export default SnakesPage;
