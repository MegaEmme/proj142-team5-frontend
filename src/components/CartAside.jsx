import { useEffect, useRef, useState, useContext } from "react";
import ReactDOM from "react-dom";
import { Offcanvas } from "bootstrap";
import { useNavigate } from "react-router-dom";
import { clearCart, removeItemFromCart } from "../utils/cartUtils";
import GlobalContext from "../contexts/globalcontext";

const CartAside = ({ isOpen, onClose }) => {
  const { cart, setCart } = useContext(GlobalContext);
  const offCanvasRef = useRef(null);
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(0);
  const deliveryPrice = 75;

  useEffect(() => {
    const total = cart.reduce((acc, item) => {
      const price = parseFloat(item.price);
      const finalPrice = item.discount
        ? price - price * item.discount
        : price;
      return acc + finalPrice;
    }, 0);
    setTotalPrice(total);
  }, [cart]);

  useEffect(() => {
    const canvas = offCanvasRef.current;
    if (!canvas) return;

    const instance = Offcanvas.getOrCreateInstance(canvas);

    if (isOpen) {
      instance.show();
    } else {
      instance.hide();
    }

    const handleHidden = () => onClose();
    canvas.addEventListener("hidden.bs.offcanvas", handleHidden);

    return () => {
      canvas.removeEventListener("hidden.bs.offcanvas", handleHidden);
    };
  }, [isOpen, onClose]);

  const handleRemoveItem = (slug) => {
    const updated = removeItemFromCart(slug);
    setCart(updated);
  };

  const handleProceedToCheckout = () => {
    const canvas = offCanvasRef.current;
    if (canvas) {
      const instance = Offcanvas.getInstance(canvas);
      if (instance) instance.hide();
    }
    navigate("/cart/checkout");
  };

  const handleGoToCart = () => {
    const canvas = offCanvasRef.current;
    if (canvas) {
      const instance = Offcanvas.getInstance(canvas);
      if (instance) instance.hide();
    }
    navigate("/cart");
  };

  return ReactDOM.createPortal(
    <div
      className="offcanvas offcanvas-end defaultcard rounded-0"
      tabIndex="-1"
      id="cartOffcanvas"
      aria-labelledby="cartOffcanvasLabel"
      ref={offCanvasRef}
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="cartOffcanvasLabel">Il Tuo Carrello</h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>

      <div className="offcanvas-body">
        {cart.length === 0 ? (
          <p>Nessun prodotto nel carrello.</p>
        ) : (
          <>
            <ul className="list-group mb-3">
              {cart.map((item, index) => {
                const price = parseFloat(item.price);
                const finalPrice = item.discount
                  ? price - price * item.discount
                  : price;

                return (
                  <li
                    className="list-group-item d-flex justify-content-between align-items-center"
                    key={index}
                  >
                    <div className="d-flex">
                      <img
                        src={`/snake-imgs/${item.image}`}
                        alt={item.image}
                        className="cart-imgs me-1"
                      />
                      <div className="d-flex flex-column">
                        <span>{item.common_name}</span>
                        <span className="fst-italic">
                          {finalPrice.toFixed(2)} €
                        </span>
                      </div>
                    </div>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleRemoveItem(item.slug)}
                    >
                      ✕
                    </button>
                  </li>
                );
              })}
            </ul>

            <button
              className="btn btn-outline-danger w-100"
              onClick={() => {
                clearCart();
                setCart([]);
              }}
            >
              Svuota Carrello
            </button>
          </>
        )}
      </div>

      {cart.length > 0 && (
        <div className="offcanvas-footer p-3 border-top">
          <div className="d-flex gap-2 mb-2">
            <button
              className="btn btnblog flex-grow-1"
              onClick={handleGoToCart}
            >
              Vai al carrello
            </button>
          </div>
          <div className="text-center">
            Tot. {parseInt(totalPrice).toFixed(2) < 250
              ? `${parseInt(totalPrice).toFixed(2)} € + ${deliveryPrice.toFixed(2)} € spese di spedizione`
              : `${parseInt(totalPrice).toFixed(2)} €`}
          </div>
        </div>
      )}
    </div>,
    document.body
  );
};

export default CartAside;