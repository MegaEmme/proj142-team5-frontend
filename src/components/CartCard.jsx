import { useEffect, useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../contexts/globalcontext";
import {
    clearCart,
    removeItemFromCart,
} from "../utils/cartUtils";

const CartCard = () => {

    const { cart, setCart } = useContext(GlobalContext);
    const [totalPrice, setTotalPrice] = useState(0)
    const navigate = useNavigate();


    const handleClearCart = () => {
        clearCart();
        setCart([]);
    };

    const handleRemoveItem = (id) => {
        const updated = removeItemFromCart(id);
        setCart(updated);
    };

    const handleProceedToCheckoutPage = () => {
        navigate("/cart/checkout");
    };

    useEffect(() => {
        const total = cart.reduce((acc, item) => acc + parseInt(item.price), 0);
        setTotalPrice(total);
    }, [cart]);


    return (
        <>
            <div className="card my-4 defaultcard">
                <div className="card-body">
                    <h1>Il tuo carrello</h1>
                    <div className="cointainer">
                        {cart.length === 0 ? (
                            <p>Nessun prodotto nel carrello.</p>
                        ) : (<>
                            <ul className="list-group mb-3">
                                {cart.map((item, index) => (
                                    <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                                        <span>{item.common_name}</span>
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
                                className="btn btn-success w-100 mb-3"
                                    onClick={handleProceedToCheckoutPage}
                                disabled={cart.length === 0}
                            >
                                Vai al checkout (tot. {totalPrice.toFixed(2)} €)
                            </button>
                            <button
                                className="btn btn-outline-danger w-100"
                                onClick={handleClearCart}
                            >
                                Svuota Carrello
                            </button>
                        </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
};

export default CartCard;