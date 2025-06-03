import { Link } from "react-router-dom";
import GlobalContext from "../contexts/globalcontext";
import { toast } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import { addItemToCart } from "../utils/cartUtils";
import { addItemToWishlist, removeItemFromWishlist } from "../utils/wishlistUtils";

const SnakeCard = ({ data, isListView }) => {
  const { cart, setCart, wishlist, setWishlist } = useContext(GlobalContext);

  const [isAddedToCart, setIsAddedToCart] = useState(false);

  // AGGIUNTO: useEffect per aggiornare lo stato del bottone in base al carrello
  useEffect(() => {
    // Controlla se l'ID del serpente di QUESTA card è presente in un elemento del carrello
    const itemInCart = cart.find(item => item.id === data.id);
    // Imposta isAddedToCart a true se l'articolo è trovato, altrimenti false
    setIsAddedToCart(!!itemInCart); // Il !! converte un valore truthy/falsy in true/false
  }, [cart, data.id]); // Le dipendenze: l'effetto si ri-esegue quando 'cart' o 'data.id' cambiano

  function invertDate(date) {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  }

  const {
    common_name,
    scientific_name,
    difficulty,
    temperament,
    sex,
    price,
    image,
    morph,
    birth,
    length,
    slug,
    discount,
  } = data;

  const isInWishlist = wishlist.some((item) => item.slug === slug);

  const handleToggleWishlist = () => {
    let updatedWishlist;
    if (isInWishlist) {
      updatedWishlist = removeItemFromWishlist(slug);
      toast.info("Rimosso dai preferiti");
    } else {
      updatedWishlist = addItemToWishlist(data);
      toast.success("Aggiunto ai preferiti");
    }
    setWishlist(updatedWishlist);
  };

  const handleAddSnakeToCart = () => {
    if (isAddedToCart) {
      console.log("Questo oggetto è già nel carrello.");
      return; // Ferma l'esecuzione della funzione
    }
    const updatedCart = addItemToCart(data);
    setCart(updatedCart);
    toast.success("Aggiunto al carrello!");
  };

  const renderHeartIcon = () => (
    <i
      className={`fa-solid fa-heart fs-5 wishlistcuore ${isInWishlist ? "text-success" : ""
        }`}
      onClick={handleToggleWishlist}
      style={{ cursor: "pointer" }}
    ></i>
  );


  if (isListView) {
    return (
      <div className="defaultcard d-flex flex-row align-items-center mb-2 rounded shadow-sm">
        <img className="col-md-1 col-2 ms-3" src={`./snake-imgs/${image}`} alt={common_name} />
        <div className="d-flex flex-row justify-content-between align-items-center flex-grow-1 ">
          {/* parte info */}
          <div className="flex-grow-1 mx-xl-5 mx-md-3 mx-2">
            <div className="d-flex flex-row justify-content-between align-items-center">
              <h5 className="fs-6 fs-md-4 m-0">{common_name}</h5>
              {renderHeartIcon()}
            </div>
            <div className="d-flex flex-column flex-md-row">
              <p className="m-1">Sesso: <strong>{sex === "m" ? "maschio" : "femmina"}</strong></p>
              <p className="m-1">Lunghezza: <strong>{length} m</strong></p>
            </div>
            <div className="d-flex flex-column flex-md-row">
              <div>
                Prezzo: <strong>{discount ? price - price * discount : price} €</strong>
              </div>
              <div className="mb-2">
                {discount > 0 && (
                  <span className="text-danger"><strong>{discount * 100}%</strong></span>
                )}
              </div>
            </div>
          </div>

          {/* parte tasti */}
          <div className="d-flex flex-column justify-content-between gap-2 me-2 flex-shrink-0 py-2" id="div-btn">
            <Link to={`/snakes/${slug}`} className="btn btnblog">Dettagli esemplare</Link>
            <button className="btn btncart" onClick={handleAddSnakeToCart} disabled={isAddedToCart}><strong>{isAddedToCart ? "Nel tuo carrello" : "Aggiungi al carrello"}</strong></button>
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
            <li className="list-group-item">{renderHeartIcon()}</li>
          </div>
          <img src={`./snake-imgs/${image}`} alt={common_name} />
          <ul className="list-group list-group-flush">
            <li className="list-group-item"><p className="m-1"> Difficoltà: <strong>{difficulty}</strong></p></li>
            <li className="list-group-item"><p className="m-1">Sesso: <strong>{sex === "m" ? "maschio" : "femmina"}</strong> </p></li>
            <li className="list-group-item"><p className="m-1"> Data di nascita: <strong>{invertDate(birth.split("T")[0])}</strong></p></li>
            <li className="list-group-item"><p className="m-1"> Lunghezza: <strong>{length} m</strong></p></li>
            <li className="list-group-item"><p className="m-1"> morph: <strong>{morph}</strong></p></li>

            <li className="list-group-item">

              <p className="mb-4 fs-3 my-text-container">
                {discount > 0 && <span className="text-danger fs-3 me-3"><strong>{discount * 100}%</strong></span>}
                {discount > 0 && <span className="text-danger fs-4 "><strong className="text-decoration-line-through">{price}€</strong></span>}<br />
                Prezzo: <strong>{discount ? price - (price * discount) : price}€</strong>
              </p>
              <div className="d-flex justify-content-between gap-2 my-container">
                <Link to={`/snakes/${slug}`} className="btn btnblog flex-shrink-2 my-text">Dettagli esemplare</Link>
                <button className="btn btncart flex-shrink-2 my-text" onClick={handleAddSnakeToCart} disabled={isAddedToCart}><strong>{isAddedToCart ? "Nel tuo carrello" : "Aggiungi al carrello"}</strong></button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="card snakecard h-100">
      <div className="card-body d-flex flex-column justify-content-between">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h3 className="m-0 my-text-container">{common_name}</h3>
            <h4 className="fst-italic m-0 my-text-container">({scientific_name})</h4>
          </div>
          {renderHeartIcon()}
        </div>
        <img src={`./snake-imgs/${image}`} alt={common_name} />
        <ul className="list-group list-group-flush">
          <li className="list-group-item"><p className="m-1">Sesso: <strong>{sex === "m" ? "maschio" : "femmina"}</strong></p></li>
          <li className="list-group-item"><p className="m-1">Data di nascita: <strong>{invertDate(birth.split("T")[0]).replace(/-/g, "/")}</strong></p></li>
          <li className="list-group-item"><p className="m-1">Lunghezza: <strong>{length} m</strong></p></li>
          <li className="list-group-item"><p className="m-1">Temperamento: <strong>{temperament}</strong></p></li>
          <li className="list-group-item"><p className="m-1">Difficoltà: <strong>{difficulty}</strong></p></li>
          <li className="list-group-item">
            <p className="mb-4 fs-3 my-text-container">
              {discount > 0 && (
                <>
                  <span className="text-danger fs-3 me-3"><strong>{discount * 100}%</strong></span>
                  <span className="text-danger fs-4"><strong className="text-decoration-line-through">{price}€</strong></span><br />
                </>
              )}
              Prezzo: <strong>{discount ? price - price * discount : price}€</strong>
            </p>
            <div className="d-flex justify-content-between gap-2 my-container">
              <Link to={`/snakes/${slug}`} className="btn btnblog flex-shrink-2 my-text">Dettagli esemplare</Link>
              <button className="btn btncart flex-shrink-2 my-text" onClick={handleAddSnakeToCart}>
                <strong>Aggiungi al carrello</strong>
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SnakeCard;
