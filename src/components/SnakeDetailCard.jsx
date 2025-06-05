import { useContext } from "react";
import { toast } from "react-toastify";
import GlobalContext from "../contexts/globalcontext";
import { addItemToCart } from "../utils/cartUtils";
import {
  addItemToWishlist,
  removeItemFromWishlist,
} from "../utils/wishlistUtils";

function invertDate(date) {
  const [year, month, day] = date.split("-");
  return `${day}-${month}-${year}`;
}

const SnakeDetailCard = ({ data }) => {
  const { cart, setCart, wishlist, setWishlist } = useContext(GlobalContext);

  const isInWishlist = wishlist.some((item) => item.slug === data.slug);
  const isInCart = cart.some((item) => item.slug === data.slug);

  // Aggiunta o rimozione dai preferiti con toast
  const handleToggleWishlist = () => {
    let updatedWishlist;
    if (isInWishlist) {
      updatedWishlist = removeItemFromWishlist(data.slug);
      toast.info("Rimosso dai preferiti");
    } else {
      updatedWishlist = addItemToWishlist(data);
      toast.success("Aggiunto ai preferiti");
    }
    setWishlist(updatedWishlist);
  };

  // Aggiunta al carrello con toast
  function handleAddSnakeToCart() {
    if (!isInCart) {
      const updatedCart = addItemToCart(data);
      setCart(updatedCart);
      toast.success("Aggiunto al carrello!");
    }
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
    discount,
  } = data;

  return (
    <div className="card defaultcard details m-5 mx-auto d-flex flex-md-row flex-column justify-content-center align-items-center">
      <img
        src={`../snake-imgs/${image}`}
        className="card-img-top p-2 imgsnakecard"
        alt={scientific_name}
      />
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="card-title">
            <strong>{scientific_name}</strong>
          </h5>
          <i
            className={`fa-solid fa-heart wishlistcuore ${
              isInWishlist ? "wishlistcuoreattivo" : ""
            }`}
            onClick={handleToggleWishlist}
          ></i>
        </div>

        <p className="card-text">
          Conosciuto come <strong>{common_name}</strong>, è un {description}
        </p>

        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            Sesso: <strong>{sex === "m" ? "maschio" : "femmina"}</strong>
          </li>
          <li className="list-group-item">
            Data di nascita:{" "}
            <strong>
              {invertDate(birth.split("T")[0]).replace(/-/g, "/")}
            </strong>
          </li>
          <li className="list-group-item">
            Temperamento: <strong>{temperament}</strong>
          </li>
          <li className="list-group-item">
            Morfologia:{" "}
            <strong>{morph === "normal" ? "nessuna" : morph}</strong>
          </li>
          <li className="list-group-item">
            Lunghezza: <strong>{length} mt</strong>
          </li>
          <li className="list-group-item">
            Difficoltà: <strong>{difficulty}</strong>
          </li>
          {CITES !== 0 && (
            <li className="list-group-item">
              <strong>
                CITES {CITES} è necessario per possedere questo serpente
              </strong>
            </li>
          )}
          {discount ? (
            <li className="list-group-item">
              <h2 className="text-danger">Serpente scontato!</h2>
              <p>Prezzo iniziale: {price} €</p>
              <p>
                Prezzo finale: <strong>{price - price * discount} €</strong>
              </p>
            </li>
          ) : (
            <li className="list-group-item">
              Prezzo: <strong>{price} €</strong>
            </li>
          )}
        </ul>

        <button
          className="btn btncart flex-shrink-2 my-text mt-3"
          onClick={handleAddSnakeToCart}
          disabled={isInCart}
        >
          <strong>
            {isInCart ? "Nel tuo carrello" : "Aggiungi al carrello"}
          </strong>
        </button>
      </div>
    </div>
  );
};

export default SnakeDetailCard;
