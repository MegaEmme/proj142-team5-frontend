import { useContext, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import GlobalContext from "../contexts/globalcontext";
import SnakeCard from "../components/SnakeCard";
import Pagination from "../components/Pagination";

const SnakesPage = () => {
  const [snakes, setSnakes] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  // Imposta i filtri da URL
  const [sortName, setSortName] = useState(searchParams.get("sortName") || "name");
  const [sortPrice, setSortPrice] = useState(searchParams.get("sortPrice") || "");
  const [habitat, setHabitat] = useState(searchParams.get("habitat") || "");
  const [temperament, setTemperament] = useState(searchParams.get("temperament") || "");
  const [discount, setDiscount] = useState(searchParams.get("discount") === "true" ? true : searchParams.get("discount") === "false" ? false : null);
  const [morph, setMorph] = useState(searchParams.get("morph") === "true" ? true : searchParams.get("morph") === "false" ? false : null);
  const [search, setSearch] = useState(searchParams.get("search") || "");

  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { setIsLoading } = useContext(GlobalContext);

  // Pagination
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(snakes.length / itemsPerPage);
  const paginatedSnakes = snakes.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  useEffect(() => { setPage(1); }, []);

  useEffect(() => {
    setSearchParams({
      sortName,
      sortPrice,
      habitat,
      temperament,
      discount,
      morph,
      search
    });
  }, [sortName, sortPrice, habitat, temperament, discount, morph, search]);

  useEffect(() => {
    getSnakes();
  }, [sortName, sortPrice, habitat, temperament, discount, morph, search]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSortDropdownOpen(false);
        setFilterDropdownOpen(false);
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
        discount: discount !== null ? discount : undefined,
        morph: morph !== null ? morph : undefined,
        search
      }
    })
      .then(res => setSnakes(res.data))
      .catch(err => console.error("Errore:", err))
      .finally(() => setIsLoading(false));
  }

  return (
    <>
      <div className="mb-3 text-center">
        <h1 className="titoloshop mb-4 mx-5 py-4 rounded-3">I nostri Serpenti</h1>
      </div>

      {/* Barra di ricerca */}
      <div className="mb-4 text-center">
        <input
          type="text"
          className="form-control d-inline w-50"
          placeholder="Cerca per nome..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Bottoni Ordina e Filtra */}
      <div className="mb-4 d-flex gap-3" ref={dropdownRef}>
        <div className="position-relative">
          <button
            className="btn btn-secondary"
            onClick={() => setSortDropdownOpen(prev => !prev)}
          >
            Ordina {sortDropdownOpen ? "▲" : "▼"}
          </button>
          {sortDropdownOpen && (
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
            </div>
          )}
        </div>

        <div className="position-relative">
          <button
            className="btn btn-secondary"
            onClick={() => setFilterDropdownOpen(prev => !prev)}
          >
            Filtra {filterDropdownOpen ? "▲" : "▼"}
          </button>
          {filterDropdownOpen && (
            <div className="border rounded bg-light p-3 mt-2 shadow" style={{ maxWidth: "300px", zIndex: 1000, position: "absolute" }}>
              <div className="mb-2">
                <label className="form-label mt-2 me-3">Morph:</label><br />
                <input type="radio" name="morph" checked={morph === true} onChange={() => setMorph(true)} />
                <label className="form-label mx-2">Speciale</label>
                <input type="radio" name="morph" checked={morph === false} onChange={() => setMorph(false)} />
                <label className="form-label mx-2">Normale</label>
                <input type="radio" name="morph" checked={morph === null} onChange={() => setMorph(null)} />
                <label className="form-label mx-2">Tutti</label>
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
      </div>

      <section>
        <div className="row mt-4 h-100">
          {snakes.length > 0 ? (
            paginatedSnakes.map((snake) => (
              <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4" key={snake.id}>
                <SnakeCard data={snake} />
              </div>
            ))
          ) : (
            <div className="text-light">Nessun serpente trovato.</div>
          )}
        </div>
      </section>

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </>
  );
};

export default SnakesPage;
