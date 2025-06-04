import { useEffect, useRef, useState, useContext } from "react";
import ReactDOM from "react-dom";
import { Offcanvas } from "bootstrap";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../contexts/globalcontext";
import { clearCart } from "../utils/cartUtils";

const CartAside = ({ isOpen, onClose }) => {
  const offCanvasRef = useRef(null);
  const navigate = useNavigate();

  const { cart, setCart } = useContext(GlobalContext);
  const [totalPrice, setTotalPrice] = useState(0);

  // Gestione apertura/chiusura
  useEffect(() => {
    if (!offCanvasRef.current) return;

    const bsOffcanvas = Offcanvas.getOrCreateInstance(offCanvasRef.current);

    isOpen ? bsOffcanvas.show() : bsOffcanvas.hide();
  }, [isOpen]);

  // Chiusura tramite pulsante
  useEffect(() => {
    const handleHide = () => onClose();
    const ref = offCanvasRef.current;

    ref?.addEventListener("hide.bs.offcanvas", handleHide);
    return () => ref?.removeEventListener("hide.bs.offcanvas", handleHide);
  }, [onClose]);

  // Calcolo totale dinamico
  useEffect(() => {
    const total = cart.reduce((acc, item) => acc + parseFloat(item.price), 0);
    setTotalPrice(total);
  }, [cart]);

  // Rimuove un elemento
  const handleRemoveItem = (slug) => {
    const updatedCart = cart.filter(item => item.slug !== slug);
    setCart(updatedCart);
  };

  // Svuota tutto
  const handleClearCart = () => {
    clearCart(); // localStorage
    setCart([]); // state
  };

  // Naviga alla pagina carrello
  const handleProceedToCartPage = () => {
    onClose();
    navigate("/cart");
  };

  return ReactDOM.createPortal(
    <div className="offcanvas offcanvas-end defaultcard rounded-0" tabIndex="-1" ref={offCanvasRef}>
      <div className="offcanvas-header">
        <h5 className="offcanvas-title">Il Tuo Carrello</h5>
        <button className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>

      <div className="offcanvas-body">
        {cart.length === 0 ? (
          <p>Il tuo carrello è vuoto.</p>
        ) : (
          <>
            <ul className="list-group mb-3">
              {cart.map((item) => (
                <li key={item.slug} className="list-group-item d-flex justify-content-between align-items-center">
                  <div className="d-flex">
                    <img src={`/snake-imgs/${item.image}`} alt={item.common_name} className="cart-imgs me-2" />
                    <div>
                      <strong>{item.common_name}</strong>
                      <div className="text-muted small">{item.price} €</div>
                    </div>
                  </div>
                  <button className="btn btn-sm btn-danger" onClick={() => handleRemoveItem(item.slug)}>✕</button>
                </li>
              ))}
            </ul>

            <button className="btn btn-outline-danger w-100" onClick={handleClearCart}>Svuota Carrello</button>
          </>
        )}
      </div>

      <div className="offcanvas-footer p-3 border-top text-center">
        <button
          className="btn btnblog"
          onClick={handleProceedToCartPage}
          disabled={cart.length === 0}
        >
          Procedi all'acquisto (tot. {totalPrice.toFixed(2)} €)
        </button>
      </div>
    </div>,
    document.body
  );
};

export default CartAside;
