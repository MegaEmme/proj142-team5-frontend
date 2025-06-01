import { useNavigate } from "react-router-dom";

const CartCard = () => {

    const navigate = useNavigate();

    return (
        <>
            <div className="card mb-5 bg-tertiary">
                <div className="card-body">
                    <h1>CARRELLO!</h1>
                </div>
                <button>Checkout</button>
            </div>
        </>
    )
};

export default CartCard;