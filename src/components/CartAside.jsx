import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import {
    Offcanvas
} from "bootstrap";


const CartAside = ({ isOpen, onClose }) => {

    const offCanvasRef = useRef(null);

    useEffect(() => {
        let bsOffcanvas;

        if (offCanvasRef.current) {
            bsOffcanvas = Offcanvas.getOrCreateInstance(offCanvasRef.current);

            if (isOpen) {
                if (!offCanvasRef.current.classList.contains("show")) {
                    bsOffcanvas.show();
                }
            } else {
                if (offCanvasRef.current.classList.contains("show")) {
                    bsOffcanvas.hide();
                }
            }

            return () => {
                if (bsOffcanvas && offCanvasRef.current) {
                    bsOffcanvas.dispose();
                }
            }
        }
    }, [isOpen]);

    useEffect(() => {
        const handleHide = () => onClose();

        const current = offCanvasRef.current;
        if (current) {
            current.addEventListener('hide.bs.offcanvas', handleHide);
        }
        return () => {
            if (current) {
                current.removeEventListener('hide.bs.offcanvas', handleHide);
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