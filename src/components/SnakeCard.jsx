import { Link } from "react-router-dom";
import GlobalContext from "../contexts/globalcontext";
import { useContext } from "react";
import { addItemToCart } from "../utils/cartUtils";


const SnakeCard = ({ data, isListView }) => {
  const { cart, setCart } = useContext(GlobalContext);

  const {
    common_name,
    scientific_name,
    description,
    price,
    image,
    discount,
    slug
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
          <p className="mb-3">{description}</p>
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
      <div className="card snakecard h-100">
        <div className="card-body d-flex flex-column justify-content-between">
          <div>
            <h3 className="card-title text-center">{common_name}</h3>
            <h4 className="card-title text-center fst-italic">({scientific_name})</h4>
          </div>
          <img src={`./snake-imgs/${image}`} alt={common_name} />
          <div>
            <p>{description}</p>
          </div>
          <div>
            {discount > 0 && <p className="text-danger">SCONTATO DEL <strong>{discount * 100}%</strong></p>}
            {discount > 0 && <p className="text-danger">Prezzo originale: <strong className="text-decoration-line-through">{price}€</strong></p>}
            <p className="mb-4 fs-3">Prezzo: <strong>{discount ? price - (price * discount) : price} €</strong></p>
            <div className="d-flex justify-content-between gap-2">
              <Link to={`/snakes/${slug}`} className="btn btnblog flex-shrink-2">Dettagli esemplare</Link>
              <button className="btn btncart flex-shrink-2" onClick={handleAddSnakeToCart}><strong>Aggiungi al carrello</strong></button>
            </div>
          </div>

        </div>
      </div>
    );
  }


  return (
    <div className="card snakecard h-100">
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <h3 className="card-title text-center">{common_name}</h3>
          <h4 className="card-title text-center fst-italic">({scientific_name})</h4>
        </div>
        <img src={`./snake-imgs/${image}`} alt={common_name} />
        <div>
          <p>{description}</p>
        </div>
        <div>
          {discount > 0 && <p className="text-danger">SCONTATO DEL <strong>{discount * 100}%</strong></p>}
          {discount > 0 && <p className="text-danger">Prezzo originale: <strong className="text-decoration-line-through">{price}€</strong></p>}
          <p className="mb-4 fs-3">Prezzo: <strong>{discount ? price - (price * discount) : price} €</strong></p>
          <div className="d-flex justify-content-between gap-2">
            <Link to={`/snakes/${slug}`} className="btn btnblog flex-shrink-2">Dettagli esemplare</Link>
            <button className="btn btncart flex-shrink-2" onClick={handleAddSnakeToCart}><strong>Aggiungi al carrello</strong></button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SnakeCard;
