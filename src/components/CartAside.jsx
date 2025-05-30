import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
    Offcanvas
} from "bootstrap";


const CartAside = ({ isOpen, onClose }) => {
    const offCanvasRef = useState(null);

    useEffect(() => {
        let bsOffcanvas;
        if (offCanvasRef.current) {
            bsOffcanvas = new Offcanvas(offCanvasRef.current);

            if (isOpen) {
                bsOffcanvas.show();
            } else {
                bsOffcanvas.hide();
            }

            return () => {
                if (bsOffcanvas) {
                    bsOffcanvas.dispose();
                }
            }
        }
    }, [isOpen]);

    useEffect(() => {
        const handleHide = () => onClose();
        const currentOffCanvas = offCanvasRef.current;
        if (currentOffCanvas) {
            currentOffCanvas.addEventListener('hide.bs.offcanvas', handleHide);
        }
        return () => {
            if (currentOffCanvas) {
                currentOffCanvas.removeEventListener('hide.bs.offcanvas', handleHide);
            }
        }
    }, [onClose]);

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
                    onClick={onClose}
                ></button>

            </div>

            <div className="offcanvas-body">

                {/* Qui andranno i prodotti nel carrello */}

                <p>Nessun prodotto nel carrello.</p>

                {/* Esempio:
                <ul className="list-group">
                    <li className="list-group-item">Prodotto 1 - Quantità: 2</li>
                    <li className="list-group-item">Prodotto 2 - Quantità: 1</li>
                </ul>
                */}

            </div>

            <div className="offcanvas-footer p-3 border-top text-center">
                <button className="btn btn-primary w-100">Procedi all'acquisto</button>
            </div>

        </div>,
        document.body
    );
};

export default CartAside;