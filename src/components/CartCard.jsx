import { useEffect, useRef, useState, useContext } from "react";
import { Offcanvas } from "bootstrap";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../contexts/globalcontext";

const CartAside = ({ isOpen, onClose }) => {
  const offCanvasRef = useRef(null);
  const navigate = useNavigate();

  const { cart, setCart } = useContext(GlobalContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const deliveryPrice = 75;

  // Gestione apertura/chiusura Offcanvas
  useEffect(() => {
    if (!offCanvasRef.current) return;

    const bsOffcanvas = Offcanvas.getOrCreateInstance(offCanvasRef.current);

    if (isOpen) {
      bsOffcanvas.show();
    } else {
      bsOffcanvas.hide();
    }

    // Listener per chiusura manuale
    const handleHide = () => onClose();
    offCanvasRef.current.addEventListener("hidden.bs.offcanvas", handleHide);

    return () => {
      offCanvasRef.current.removeEventListener("hidden.bs.offcanvas", handleHide);
    };
  }, [isOpen, onClose]);

  // Rimuove un singolo item
  const handleRemoveItem = (slug) => {
    const updatedCart = cart.filter(item => item.slug !== slug);
    setCart(updatedCart);
  };

  // Aggiorna totale ogni volta che cambia il carrello
  useEffect(() => {
    const total = cart.reduce((acc, item) => acc + parseFloat(item.price), 0);
    setTotalPrice(total);
  }, [cart]);

  const goToCheckout = () => {
    onClose(); // chiudi il carrello
    navigate("/cart/checkout");
  };

  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex="-1"
      ref={offCanvasRef}
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title">🛒 Il tuo carrello</h5>
        <button
          type="button"
          className="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Chiudi"
        ></button>
      </div>

      <div className="offcanvas-body">
        {cart.length === 0 ? (
          <p>Il tuo carrello è vuoto.</p>
        ) : (
          <>
            <ul className="list-group mb-3">
              {cart.map((item) => (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center"
                  key={item.slug}
                >
                  <div className="d-flex align-items-center">
                    <img
                      src={`/snake-imgs/${item.image}`}
                      alt={item.common_name}
                      className="me-2"
                      style={{ width: "60px", height: "40px", objectFit: "cover" }}
                    />
                    <div>
                      <div>{item.common_name}</div>
                      <small className="text-muted">{item.price} €</small>
                    </div>
                  </div>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleRemoveItem(item.slug)}
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>

            <div className="d-flex justify-content-between align-items-center">
              <strong>Totale:</strong>
              <span> Tot. {parseInt(totalPrice).toFixed(2) < 250 ? `${parseInt(totalPrice).toFixed(2)} € + ${deliveryPrice.toFixed(2)} € spese di spedizione` : `${parseInt(totalPrice).toFixed(2)} €`}</span>
            </div>

            <button
              className="btn btnblog mt-3 w-100"
              onClick={goToCheckout}
            >
              Procedi al checkout
            </button>

          </>
        )}
      </div>
    </div>
  );
};

export default CartAside;
