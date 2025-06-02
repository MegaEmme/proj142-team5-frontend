import { useEffect, useRef, useState, useContext } from "react";
import ReactDOM from "react-dom";
import { Offcanvas } from "bootstrap";
import { useNavigate } from "react-router-dom";
import {
    getCart,
    saveCart,
    clearCart,
    removeItemFromCart,
    addItemToCart
} from "../utils/cartUtils";
import GlobalContext from "../contexts/globalcontext";



const CartAside = ({ isOpen, onClose }) => {

    const { cart, setCart } = useContext(GlobalContext);
    const offCanvasRef = useRef(null);
    const navigate = useNavigate();
    const [totalPrice, setTotalPrice] = useState(0)



    useEffect(() => {
        setCart(getCart());
    }, []);



    useEffect(() => {
        const total = cart.reduce((acc, item) => acc + parseInt(item.price), 0);
        setTotalPrice(total);
    }, [cart]);


    useEffect(() => {
        saveCart(cart);
    }, [cart]);


    useEffect(() => {
        if (!offCanvasRef.current) return;
        const bsOffcanvas = Offcanvas.getOrCreateInstance(offCanvasRef.current);

        if (isOpen && !offCanvasRef.current.classList.contains("show")) {
            bsOffcanvas.show();
        } else if (!isOpen && offCanvasRef.current.classList.contains("show")) {
            bsOffcanvas.hide();
        }
    }, [isOpen]);


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

    const handleRemoveItem = (id) => {
        const updated = removeItemFromCart(id);
        setCart(updated);
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
                            {cart.map((item, index) => (
                                <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                                    <div className="d-flex">
                                        <img src={`./snake-imgs/${item.image}`} alt={item.image} className="cart-imgs me-1" />
                                        <div className="d-flex flex-column">
                                            <span>{item.common_name}</span>
                                            <span className="fst-italic">{item.discount ? item.price - (item.price * item.discount) : item.price} €</span>
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