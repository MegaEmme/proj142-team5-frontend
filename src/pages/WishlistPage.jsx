import { useContext } from "react";
import { toast } from "react-toastify";
import GlobalContext from "../contexts/globalcontext";

export default function WishlistPage() {
  const { wishlist, setWishlist, cart, setCart } = useContext(GlobalContext);

  const handleRemove = (slug) => {
    const updated = wishlist.filter((item) => item.slug !== slug);
    setWishlist(updated);
    toast.info("Rimosso dai preferiti");
  };

  const handleAddToCart = (item) => {
    const exists = cart.some((c) => c.slug === item.slug);
    if (!exists) {
      const updated = [...cart, item];
      setCart(updated);
      toast.success("Aggiunto al carrello!");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card defaultcard my-4">
        <div className="card-body defaultcard">
          <h2 className="mb-4">Lista dei desideri</h2>
          {wishlist.length === 0 ? (
            <p>La tua lista dei desideri è vuota.</p>
          ) : (
            <div className="row">
              {[...wishlist]
                .sort((a, b) => {
                  const aInCart = cart.some((c) => c.slug === a.slug);
                  const bInCart = cart.some((c) => c.slug === b.slug);
                  if (aInCart === bInCart) return 0;
                  return aInCart ? 1 : -1; // quelli NON nel carrello prima
                })
                .map((item) => {
                  const isInCart = cart.some((c) => c.slug === item.slug);
                  return (
                    <div key={item.slug} className="col-md-4 mb-4">
                      <div className="card h-100 position-relative">
                        <img
                          src={`/snake-imgs/${item.image}`}
                          className={`card-img-top ${isInCart ? 'opacity-50' : ''}`}
                          alt={item.common_name}
                        />
                        {isInCart && (
                          <div
                            className="position-absolute top-0 start-0 w-100 h-100"
                            style={{
                              backgroundColor: 'rgba(0,0,0,0.3)',
                              pointerEvents: 'none'
                            }}
                          />
                        )}
                        <div className="card-body d-flex flex-column justify-content-between">
                          <div>
                            <h5 className="card-title">{item.common_name}</h5>
                            <p className="card-text">{item.scientific_name}</p>
                          </div>
                          <div className="d-flex justify-content-between mt-3">
                            <button className="btn btn-outline-danger" onClick={() => handleRemove(item.slug)}>
                              <i className="fas fa-trash-alt"></i>
                            </button>
                            <button
                              className={`btn btnblog ${isInCart ? "opacity-50" : ""}`}
                              onClick={() => handleAddToCart(item)}
                              disabled={isInCart}
                            >
                              <strong>{isInCart ? "Nel tuo carrello" : "Aggiungi al carrello"}</strong>
                              <i className="fas fa-cart-plus ms-2"></i>
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
      </div>
    </div>
  );
}
