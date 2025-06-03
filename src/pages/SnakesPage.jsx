import { useContext, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import GlobalContext from "../contexts/globalcontext";
import SnakeCard from "../components/SnakeCard";
import Pagination from "../components/Pagination";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThLarge, faList } from '@fortawesome/free-solid-svg-icons';

const SnakesPage = () => {
  const [snakes, setSnakes] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const [sortName, setSortName] = useState(searchParams.get("sortName") || "name");
  const [sortPrice, setSortPrice] = useState(searchParams.get("sortPrice") || "");
  const [habitat, setHabitat] = useState(searchParams.get("habitat") || "");
  const [temperament, setTemperament] = useState(searchParams.get("temperament") || "");
  const [discount, setDiscount] = useState(searchParams.get("discount") === "true" ? true : searchParams.get("discount") === "false" ? false : null);
  const [morph, setMorph] = useState(searchParams.get("morph") === "true" ? true : searchParams.get("morph") === "false" ? false : null);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [searchInput, setSearchInput] = useState(search);

  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { setIsLoading } = useContext(GlobalContext);

  const [isCardLayout, setIsCardLayout] = useState(true); // true = layout a card (griglia), false = layout a lista

  const [page, setPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(snakes.length / itemsPerPage);
  const paginatedSnakes = snakes.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  useEffect(() => { setPage(1); }, []);

  useEffect(() => {
    const params = {};

    if (sortName) params.sortName = sortName;
    if (sortPrice) params.sortPrice = sortPrice;
    if (habitat) params.habitat = habitat;
    if (temperament) params.temperament = temperament;
    if (discount !== null) params.discount = discount;
    if (morph !== null) params.morph = morph;
    if (search.trim() !== "") params.search = search;

    setSearchParams(params);
  }, [sortName, sortPrice, habitat, temperament, discount, morph, search]);

  useEffect(() => {
    const delay = setTimeout(() => {
      setSearch(searchInput);
    }, 500);
    return () => clearTimeout(delay);
  }, [searchInput]);

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
        <h1 className="fw-bolder card defaultcard mb-4 mt-5 py-4 rounded-3">I nostri Serpenti</h1>
      </div>

      {/* Bottoni Ordina e Filtra*/}
      <div className="mb-4 d-flex gap-3 justify-content-between align-items-stretch flex-wrap" ref={dropdownRef}>
        <div>
          <button
            className="btn btnblog"
            onClick={() => {
              setSortDropdownOpen(prev => !prev);
              setFilterDropdownOpen(false);
            }}
          >
            Ordina {sortDropdownOpen ? "▲" : "▼"}
          </button>
          {sortDropdownOpen && (
            <div className="border bg-light rounded p-3 mt-2 shadow filter" >
              <div className="mb-2">
                <label className="form-label">Ordina per Nome:</label>
                <select className="form-select" value={sortName} onChange={e => {
                  setSortName(e.target.value);
                  setSortPrice("");
                }}>
                  <option value="name">Nome (A-Z)</option>
                  <option value="name_desc">Nome (Z-A)</option>
                </select>
              </div>

              <div className="mb-2">
                <label className="form-label">Ordina per Prezzo:</label>
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
                <label className="form-label">Ordina per Habitat:</label>
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
                <label className="form-label">Ordina per Temperamento:</label>
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

        <div>
          <button
            className="btn btnblog"
            onClick={() => {
              setFilterDropdownOpen(prev => !prev);
              setSortDropdownOpen(false);
            }}
          >
            Filtra {filterDropdownOpen ? "▲" : "▼"}
          </button>
          {filterDropdownOpen && (
            <div className="border rounded bg-light p-3 mt-2 shadow filter">
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
        {/* bottoni lista/card */}
        <button
          className={`btn d-flex text-center ${isCardLayout ? "btnstyle" : "btn-outline-style"}`}
          onClick={() => setIsCardLayout(true)} // Al click, imposta la vista a card
        >
          <FontAwesomeIcon icon={faThLarge} className="mx-auto my-auto" /> {/* Icona per la griglia */}
        </button>
        <button
          className={`btn d-flex ${!isCardLayout ? "btnstyle" : "btn-outline-style"}`}
          onClick={() => setIsCardLayout(false)} // Al click, imposta la vista a lista
        >
          <FontAwesomeIcon icon={faList} className="mx-auto my-auto" /> {/* Icona per la lista */}
        </button>

        {/* Barra di ricerca */}
        <div className=" text-center flex-grow-1 col-sm-6 col-12">
          <input
            type="text"
            className="form-control d-inline"
            placeholder="Cerca per nome..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      </div >

      <section>
        {/* Controlla se ci sono serpenti da visualizzare */}
        {snakes.length === 0 ? (
          <div className="text-light text-center mt-5">Nessun serpente trovato.</div>
        ) : (
          isCardLayout ? ( // Se isCardLayout è TRUE: Visualizzazione a GRIGLIA (Card View)
            <div className="row mt-4 h-100">
              {paginatedSnakes.map((snake) => (
                <div className="col-12 col-md-6 col-lg-4 mb-4" key={snake.id}>
                  <SnakeCard data={snake} isListView={false} />
                </div>
              ))}
            </div>
          ) : ( // Altrimenti, se isCardLayout è FALSE: Visualizzazione a LISTA (List View)
            <div className="list-group mt-4">
              {paginatedSnakes.map((snake) => (
                <SnakeCard key={snake.id} data={snake} isListView={true} />
              ))}
            </div>
          )
        )}
      </section>

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </>
  );
};

export default SnakesPage;
