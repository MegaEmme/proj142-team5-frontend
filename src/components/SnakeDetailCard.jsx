import { addItemToCart } from "../utils/cartUtils";
import { useContext } from "react";
import GlobalContext from "../contexts/globalcontext";

function invertDate(date) {
  const [year, month, day] = date.split("-");
  return `${day}-${month}-${year}`;
}

const SnakeDetailCard = ({ data }) => {
  const { cart, setCart } = useContext(GlobalContext);

  function handleAddSnakeToCart() {
    const updatedCart = addItemToCart(data);

    setCart(updatedCart);
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
    <>
      <div className="card defaultcard details m-5 mx-auto d-flex flex-row justify-content-center align-items-center">
        <img
          src={`../snake-imgs/${image}`}
          className="card-img-top p-5 w-50"
          alt={scientific_name}
        />
        <div className="card-body">
          <h5 className="card-title">
            <strong>{scientific_name}</strong>{" "}
          </h5>
          <p className="card-text">
            Conosciuto come <strong>{common_name}</strong> , è un {description}
          </p>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              Sesso: <strong>{sex === "m" ? "maschio" : "femmina"}</strong>{" "}
            </li>
            <li className="list-group-item">
              Data di nascita:{" "}
              <strong>
                {invertDate(birth.split("T")[0]).replace(/-/g, "/")}
              </strong>{" "}
            </li>
            <li className="list-group-item">
              Temperamento: <strong>{temperament}</strong>{" "}
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
                <h2 className="text-danger"> Serpente scontato!</h2>
                <p>Prezzo iniziale: {price} €</p>
                <p>
                  Prezzo finale:{" "}
                  <strong>
                    {discount ? price - price * discount : price} €
                  </strong>
                </p>
              </li>
            ) : (
              <li className="list-group-item">
                Prezzo: <strong>{price} €</strong>
              </li>
            )}

            <button
              className="btn btncart flex-shrink-2 my-text"
              onClick={handleAddSnakeToCart}
            >
              <strong>Aggiungi al carrello</strong>
            </button>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SnakeDetailCard;
