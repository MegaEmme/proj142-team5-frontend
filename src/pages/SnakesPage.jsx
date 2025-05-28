import { useContext, useEffect, useRef, useState } from "react";
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
  const [discount, setDiscount] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { setIsLoading } = useContext(GlobalContext);
  const dropdownRef = useRef(null);

  useEffect(() => {
    getSnakes();
  }, [sortName, sortPrice, habitat, temperament, discount]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function getSnakes() {
    setIsLoading(true);
    const sort = sortPrice || sortName;

    axios.get("http://127.0.0.1:3000/api/snakes", {
      params: {
        sort,
        habitat,
        temperament,
        discount: discount !== null ? discount : undefined
      }
    })
      .then(res => setSnakes(res.data))
      .catch(err => console.error("Errore:", err))
      .finally(() => setIsLoading(false));
  }

  return (
    <>
      <Jumbotron />
      <div className=" mb-3 text-center">
        <h1 className="text-white mb-4">i nostri Serpenti</h1>
      </div>

      <div className="mb-4 position-relative" ref={dropdownRef}>
        <button
          className="btn btn-secondary"
          onClick={() => setDropdownOpen(prev => !prev)}
        >
          Filtra {dropdownOpen ? "▲" : "▼"}
        </button>

        {dropdownOpen && (
          <div className="border rounded bg-light p-3 mt-2 shadow" style={{ maxWidth: "300px", zIndex: 1000, position: "absolute" }}>
            <div className="mb-2">
              <label className="form-label">Ordina per nome:</label>
              <select className="form-select" value={sortName} onChange={e => {
                setSortName(e.target.value);
                setSortPrice("");
              }}>
                <option value="name">Nome (A-Z)</option>
                <option value="name_desc">Nome (Z-A)</option>
              </select>
            </div>

            <div className="mb-2">
              <label className="form-label">Ordina per prezzo:</label>
              <select className="form-select" value={sortPrice} onChange={e => {
                setSortPrice(e.target.value);
                setSortName("");
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

            <div className="mb-2">
              <label className="form-label mt-2 me-3">Scontato:</label><br />
              <input type="radio" name="discount" checked={discount === true} onChange={() => setDiscount(true)} />
              <label className="form-label mx-2">Sì</label>
              <input type="radio" name="discount" checked={discount === false} onChange={() => setDiscount(false)} />
              <label className="form-label mx-2">No</label>
              <input type="radio" name="discount" checked={discount === null} onChange={() => setDiscount(null)} />
              <label className="form-label mx-2">Tutti</label>
            </div>
          </div>
        )}
      </div>

      <section>
        <div className="row mt-4 h-100">
          {snakes.length > 0 ? (
            snakes.map((snake) => (
              <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4" key={snake.id}>
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
