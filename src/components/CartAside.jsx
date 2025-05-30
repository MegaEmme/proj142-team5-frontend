import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { Offcanvas } from "bootstrap";
import { useNavigate } from "react-router-dom";
import {
    getCart,
    saveCart,
    clearCart,
    removeItemFromCart,
} from "../utils/cartUtils";

const CartAside = ({ isOpen, onClose }) => {
    const offCanvasRef = useRef(null);
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);

    // Carica carrello da localStorage al primo render
    useEffect(() => {
        setCart(getCart());
    }, []);

    // Salva ogni cambiamento del carrello
    useEffect(() => {
        saveCart(cart);
    }, [cart]);

    // Mostra/nasconde l'Offcanvas
    useEffect(() => {
        if (!offCanvasRef.current) return;
        const bsOffcanvas = Offcanvas.getOrCreateInstance(offCanvasRef.current);

        if (isOpen && !offCanvasRef.current.classList.contains("show")) {
            bsOffcanvas.show();
        } else if (!isOpen && offCanvasRef.current.classList.contains("show")) {
            bsOffcanvas.hide();
        }
    }, [isOpen]);

    // Chiude il pannello su X o clic esterno
    useEffect(() => {
        const handleHide = () => onClose();
        const current = offCanvasRef.current;

        if (current) {
            current.addEventListener("hide.bs.offcanvas", handleHide);
        }

        return () => {
            if (current) {
                current.removeEventListener("hide.bs.offcanvas", handleHide);
            }
        };
    }, [onClose]);

    const handleProceedToCartPage = () => {
        onClose();
        navigate("/cart");
    };

    const handleClearCart = () => {
        clearCart();
        setCart([]);
    };

    const handleRemoveItem = (name) => {
        const updated = removeItemFromCart(name);
        setCart(updated);
    };

    return ReactDOM.createPortal(
        <div
            className="offcanvas offcanvas-end"
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
                            {cart.map((item, index) => (
                                <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                                    <span>{item.name} – Quantità: {item.quantity}</span>
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => handleRemoveItem(item.name)}
                                    >
                                        ✕
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <button
                            className="btn btn-outline-danger w-100"
                            onClick={handleClearCart}
                        >
                            Svuota Carrello
                        </button>
                    </>
                )}
            </div>

            <div className="offcanvas-footer p-3 border-top text-center">
                <button
                    className="btn btn-primary w-100"
                    onClick={handleProceedToCartPage}
                    disabled={cart.length === 0}
                >
                    Procedi all'acquisto
                </button>
            </div>
        </div>,
        document.body
    );
};

export default CartAside;