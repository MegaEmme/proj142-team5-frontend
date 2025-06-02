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
      <div className="list-group-item d-flex flex-row justify-content-between align-items-center mb-2 p-3 border rounded shadow-sm">

        <img className="w-25" src={`./snake-imgs/${image}`} alt={common_name} />
        <div className="flex-grow-1">
          <h5 className="mb-1 fw-bold">{common_name}</h5>
          <h5 className="mb-1 fw-bold">{scientific_name}</h5>
          <p className="mb-1 fw-bold">{description}</p>
          {discount > 0 && <p className="text-danger">SCONTATO DEL <strong>{discount * 100}%</strong></p>}
          {discount > 0 && <p className="text-danger">Prezzo originale: <strong className="text-decoration-line-through">{price}€</strong></p>}
          <p className="mb-4 fs-3">Prezzo: <strong>{discount ? price - (price * discount) : price} €</strong></p>
          <div className="d-flex justify-content-between gap-2">
            <Link to={`/snakes/${slug}`} className="btn btnblog flex-shrink-2">Dettagli esemplare</Link>
            <button className="btn btncart flex-shrink-2" onClick={handleAddSnakeToCart}><strong>Aggiungi al carrello</strong></button>
          </div>
        </div>
      </div>
    );
  } else {
    // Layout per la visualizzazione a CARD (il tuo layout esistente)
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
