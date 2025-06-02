import { Link } from "react-router-dom";
import GlobalContext from "../contexts/globalcontext";
import { useContext } from "react";
import { addItemToCart } from "../utils/cartUtils";


const SnakeCard = ({ data, isListView }) => {
  const { cart, setCart } = useContext(GlobalContext);

  function invertDate(date) {
    const [year, month, day] = date.split("-");
    return `${day}-${month}-${year}`;
  }

  const {
    common_name,
    scientific_name,
    difficulty,
    temperament,
    sex,
    description,
    price,
    image,
    morph,
    birth,
    length,
    CITES,
    slug,
    discount
  } = data;

  function handleAddSnakeToCart() {
    const updatedCart = addItemToCart(data);

    setCart(updatedCart);
  }

  if (isListView) {
    // Layout per la visualizzazione a LISTA
    return (
      <div className="defaultcard d-flex flex-md-row flex-column justify-content-between align-items-center mb-4 p-3 rounded shadow-sm">
        <img className="col-xl-3 col-md-4 col-12" src={`./snake-imgs/${image}`} alt={common_name} />
        <div className="flex-grow-1 mx-xl-5 mx-md-3 mx-2">
          <h5 className="fs-1 mb-3 card-title">{common_name}</h5>
          <h5 className="fs-2 mb-3 card-title fst-italic">{scientific_name}</h5>
          <div className="d-flex flex-column flex-md-row mb-3">
            <div className="me-5">
              <p className="m-1"><strong>{sex === "m" ? "Maschio" : "Femmina"}</strong> </p>
              <p className="m-1"><strong>{temperament}</strong>  </p>
              <p className="m-1"> Difficoltà: <strong>{difficulty}</strong></p>
            </div>
            <div>
              <p className="m-1"> Data di nascita: <strong> {invertDate(birth.split('T')[0])}</strong> </p>
              <p className="m-1"> Morfologia: <strong>{morph === "normal" ? "wild type" : morph}</strong></p>
              <p className="m-1"> Lunghezza: <strong>{length} m</strong></p>
            </div>
          </div>
          {discount > 0 && <p className="text-danger">SCONTATO DEL <strong>{discount * 100}%</strong></p>}
          {discount > 0 && <p className="text-danger">Prezzo originale: <strong className="text-decoration-line-through">{price}€</strong></p>}
          <p className="mb-4 fs-3">Prezzo: <strong>{discount ? price - (price * discount) : price} €</strong></p>
          <div className="d-flex justify-content-between mx-5 gap-2">
            <Link to={`/snakes/${slug}`} className="btn btnblog">Dettagli esemplare</Link>
            <button className="btn btncart" onClick={handleAddSnakeToCart}><strong>Aggiungi al carrello</strong></button>
          </div>
        </div>
      </div>
    );
  } else {
    // Layout per la visualizzazione a CARD
    return (
      <div className="card snakecard h-100 ">
        <div className="card-body d-flex flex-column justify-content-between">
          <div className="my-container">
            <h3 className=" text-center my-text">{common_name}</h3>
            <h4 className=" text-center fst-italic my-text">({scientific_name})</h4>
          </div>
          <img src={`./snake-imgs/${image}`} alt={common_name} />
          <ul className="list-group list-group-flush">
            <li className="list-group-item"><p className="m-1">Sesso: <strong>{sex === "m" ? "Maschio" : "Femmina"}</strong> </p></li>
            <li className="list-group-item"><p className="m-1"> Data di nascita: <strong> {invertDate(birth.split('T')[0])}</strong></p></li>
            <li className="list-group-item"><p className="m-1"> Lunghezza: <strong>{length} m</strong></p></li>

            <li className="list-group-item">
              {discount > 0 && <p className="text-danger">SCONTATO DEL <strong>{discount * 100}%</strong></p>}
              {discount > 0 && <p className="text-danger">Prezzo originale: <strong className="text-decoration-line-through">{price}€</strong></p>}
              <p className="mb-4 fs-3">Prezzo: <strong>{discount ? price - (price * discount) : price} €</strong></p>
              <div className="d-flex justify-content-between gap-2 my-container">
                <Link to={`/snakes/${slug}`} className="btn btnblog flex-shrink-2 my-text">Dettagli esemplare</Link>
                <button className="btn btncart flex-shrink-2 my-text" onClick={handleAddSnakeToCart}><strong>Aggiungi al carrello</strong></button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
};

export default SnakeCard;
