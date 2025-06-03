import { useContext } from "react";
import { toast } from "react-toastify";
import GlobalContext from "../contexts/globalcontext";
import {
  removeItemFromWishlist,
  getWishlist,
} from "../utils/wishlistUtils";
import {
  addItemToCart,
  saveCart,
} from "../utils/cartUtils";

export default function WishlistPage() {
  const { wishlist, setWishlist, setCart, cart } = useContext(GlobalContext);

  const handleRemove = (slug) => {
    const updatedWishlist = removeItemFromWishlist(slug);
    setWishlist(updatedWishlist);
    toast.info("Rimosso dai preferiti");
  };

  const handleAddToCart = (item) => {
    const updatedCart = addItemToCart(item);
    saveCart(updatedCart);
    setCart(updatedCart);
    toast.success("Aggiunto al carrello!");
    // ❌ NON facciamo il redirect
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Lista dei desideri 🖤</h2>

      {wishlist.length === 0 ? (
        <p>La tua lista dei desideri è vuota.</p>
      ) : (
        <div className="row">
          {wishlist.map((item) => {
            const isInCart = cart.some((c) => c.slug === item.slug);
            return (
              <div key={item.slug} className="col-md-4 mb-4">
                <div className="card h-100">
                  <img
                    src={`./snake-imgs/${item.image}`}
                    className="card-img-top"
                    alt={item.common_name}
                  />
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                      <h5 className="card-title">{item.common_name}</h5>
                      <p className="card-text">{item.scientific_name}</p>
                    </div>
                    <div className="d-flex justify-content-between mt-3">
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => handleRemove(item.slug)}
                        title="Rimuovi dai preferiti"
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                      <button
                        className={`btn btn-outline-primary ${isInCart ? "opacity-50" : ""}`}
                        onClick={() => handleAddToCart(item)}
                        disabled={isInCart}
                        title={isInCart ? "Già nel carrello" : "Aggiungi al carrello"}
                      >
                        <i className="fas fa-cart-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
