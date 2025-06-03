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
      <div className="defaultcard d-flex flex-row align-items-center mb-2 rounded shadow-sm">
        <img className="col-md-1 col-2" src={`./snake-imgs/${image}`} alt={common_name} />
        <div className="d-flex flex-row justify-content-between align-items-center flex-grow-1">
          {/* parte info */}
          <div className="flex-grow-1 mx-xl-5 mx-md-3 mx-2">
            <div className="d-flex flex-row ">
              <div className="me-5">
                <h5 className="fs-4">{common_name}</h5>
              </div>
              <div>
                <h5 className="fs-5 fst-italic">{scientific_name}</h5>
              </div>
            </div>
            <div className="d-flex flex-column flex-md-row">
              <div className="me-5">
                <p p className="m-1" > Sesso: <strong>{sex === "m" ? "maschio" : "femmina"}</strong> </p>
              </div >
              <div>
                <p className="m-1"> Lunghezza: <strong>{length} m</strong></p>
              </div>
            </div >
            <div className="d-flex flex-column flex-md-row">
              <div className="me-5">
                Prezzo: <strong>{discount ? price - (price * discount) : price} €</strong>

              </div >
              <div className="mb-2">
                {discount > 0 && <span className="text-danger"><strong>{discount * 100}%</strong></span>}
              </div>
            </div >
          </div>

          {/* parte tasti */}
          <div className="d-flex flex-column justify-content-between gap-2 me-2">
            <Link to={`/snakes/${slug}`} className="btn btnblog">Dettagli esemplare</Link>
            <button className="btn btncart" onClick={handleAddSnakeToCart}><strong>Aggiungi al carrello</strong></button>
          </div>
        </div >
      </div >
    );
  } else {
    // Layout per la visualizzazione a CARD
    return (
      <div className="card snakecard h-100 ">
        <div className="card-body d-flex flex-column justify-content-between">

          <div className=" d-flex justify-content-between align-items-center">
            <div className="">
              <h3 className="m-0 my-text-container">{common_name}</h3>
              <h4 className=" fst-italic m-0 my-text-container">({scientific_name})</h4>
            </div>
            <li className="list-group-item"><i class="fa-solid fa-heart fs-3 wishlistcuore"></i></li>
          </div>
          <img src={`./snake-imgs/${image}`} alt={common_name} />
          <ul className="list-group list-group-flush">
            <li className="list-group-item"><p className="m-1">Sesso: <strong>{sex === "m" ? "maschio" : "femmina"}</strong> </p></li>
            <li className="list-group-item"><p className="m-1"> Data di nascita: <strong>{invertDate(birth.split("T")[0]).replace(/-/g, "/")}</strong></p></li>
            <li className="list-group-item"><p className="m-1"> Lunghezza: <strong>{length} m</strong></p></li>
            <li className="list-group-item"><p className="m-1"> Temperamento: <strong>{temperament}</strong></p></li>
            <li className="list-group-item"><p className="m-1"> Difficoltà: <strong>{difficulty}</strong></p></li>

            <li className="list-group-item">

              <p className="mb-4 fs-3 my-text-container">
                {discount > 0 && <span className="text-danger fs-3 me-3"><strong>{discount * 100}%</strong></span>}
                {discount > 0 && <span className="text-danger fs-4 "><strong className="text-decoration-line-through">{price}€</strong></span>}<br />
                Prezzo: <strong>{discount ? price - (price * discount) : price}€</strong>
              </p>
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
