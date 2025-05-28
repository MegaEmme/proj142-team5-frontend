import { useContext, useEffect, useState } from "react";
import axios from "axios";
import GlobalContext from "../contexts/globalcontext";
import SnakeCard from "../components/SnakeCard";
import Jumbotron from "../components/Jumbotron";

const SnakesPage = () => {
  const [snakes, setSnakes] = useState([]);
  const [sortName, setSortName] = useState("name");
  const [sortPrice, setSortPrice] = useState("");
  const [habitat, setHabitat] = useState("");
  const [temperament, setTemperament] = useState("");
  const { setIsLoading } = useContext(GlobalContext);

  useEffect(() => {
    getSnakes();
  }, [sortName, sortPrice, habitat, temperament]);

  function getSnakes() {
    setIsLoading(true);
    const sort = sortPrice || sortName;

    axios.get("http://127.0.0.1:3000/api/snakes", {
      params: { sort, habitat, temperament }
    })
      .then(res => setSnakes(res.data))
      .catch(err => console.error("Errore:", err))
      .finally(() => setIsLoading(false));
  }

  return (
    <>
      <Jumbotron />
      <header className="d-flex justify-content-between mb-3 align-items-center">
        <h1 className="text-light mb-4">Serpenti</h1>
      </header>

      <div className="dropdown mb-4">
        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
          Filtra
        </button>
        <div className="dropdown-menu p-3" style={{ minWidth: "280px" }}>
          <div className="mb-2">
            <label className="form-label">Ordina per nome:</label>
            <select className="form-select" value={sortName} onChange={e => {
              setSortName(e.target.value);
              setSortPrice(""); // reset prezzo
            }}>
              <option value="name">Nome (A-Z)</option>
              <option value="name_desc">Nome (Z-A)</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="form-label">Ordina per prezzo:</label>
            <select className="form-select" value={sortPrice} onChange={e => {
              setSortPrice(e.target.value);
              setSortName(""); // reset nome
            }}>
              <option value="">-- Nessuno --</option>
              <option value="price">Prezzo crescente</option>
              <option value="price_desc">Prezzo decrescente</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="form-label">Habitat:</label>
            <select className="form-select" value={habitat} onChange={e => setHabitat(e.target.value)}>
              <option value="">Tutti</option>
              <option value="Foreste e giungle tropicali umide">Foreste e giungle tropicali umide</option>
              <option value="Boscaglie e foreste temperate">Boscaglie e foreste temperate</option>
              <option value="Campi aperti, praterie e terreni agricoli">Campi aperti, praterie e terreni agricoli</option>
              <option value="Zone semi-aride o desertiche">Zone semi-aride o desertiche</option>
              <option value="Zone rocciose o aride subtropicali">Zone rocciose o aride subtropicali</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="form-label">Temperamento:</label>
            <select className="form-select" value={temperament} onChange={e => setTemperament(e.target.value)}>
              <option value="">Tutti</option>
              <option value="docile">docile</option>
              <option value="docile-aggressivo">docile-aggressivo</option>
              <option value="tendente al nervoso">tendente al nervoso</option>
              <option value="intelligente-imprevedibile">intelligente-imprevedibile</option>
              <option value="schiva-imprevedibile">schiva-imprevedibile</option>
            </select>
          </div>
        </div>
      </div>

      <section>
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
