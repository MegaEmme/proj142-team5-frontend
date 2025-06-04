import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../contexts/globalcontext";
import CheckoutPage from "../pages/CheckoutPage"; 

const CartCard = () => {
  const navigate = useNavigate();
  const { cart, setCart } = useContext(GlobalContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showCheckout, setShowCheckout] = useState(false);
  const deliveryPrice = 75;

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

  if (showCheckout) {
    return <CheckoutPage onBack={() => setShowCheckout(false)} />;
  }

  return (
    <div className="container my-4">
      {cart.length === 0 ? (
        <div className="alert alert-info">Il tuo carrello è vuoto.</div>
      ) : (
        <>
          <div className="card defaultcard">
            <div className="card-body defaultcard">
              <h2 className="mb-4">Il tuo carrello</h2>
              {cart.map((item) => (
                <div
                  key={item.slug}
                  className="d-flex justify-content-between align-items-center mb-3 p-2 border-bottom"
                >
                  <div className="d-flex align-items-center">
                    <img
                      src={`/snake-imgs/${item.image}`}
                      alt={item.common_name}
                      className="me-3"
                      style={{ width: "100px", height: "70px", objectFit: "cover" }}
                    />
                    <div>
                      <h5 className="mb-0">{item.common_name}</h5>
                      <p className="text mb-0">{item.price} €</p>
                    </div>
                  </div>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => handleRemoveItem(item.slug)}
                  >
                    Rimuovi
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="card mt-4 defaultcard">
            <div className="card-body ">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5>Subtotale:</h5>
                <span>{totalPrice.toFixed(2)} €</span>
              </div>

              {totalPrice < 250 && (
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5>Spese di spedizione:</h5>
                  <span>{deliveryPrice.toFixed(2)} €</span>
                </div>
              )}

              <div className="d-flex justify-content-between align-items-center border-top pt-3">
                <h4>Totale:</h4>
                <h4>{totalPrice < 250 ? (totalPrice + deliveryPrice).toFixed(2) : totalPrice.toFixed(2)} €</h4>
              </div>

              <button
                className="btn btnblog w-100 mt-3"
                onClick={() => setShowCheckout(true)}
              >
                Procedi al checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartCard;