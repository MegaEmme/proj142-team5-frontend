import { useState, useContext, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { clearCart } from "../utils/cartUtils";
import GlobalContext from "../contexts/globalcontext";

export default function CheckoutPage({ onBack }) {
    const navigate = useNavigate();
    const { cart, setCart, submittedData, setSubmittedData } = useContext(GlobalContext);
    const [totalPrice, setTotalPrice] = useState(0);
    const [formData, setFormData] = useState({
        status: 'pagato',
        payment_method: 'Paypal',
        first_name: '',
        last_name: '',
        address: '',
        phone_number: '',
        email: '',
    });
    const [orderSuccess, setOrderSuccess] = useState(false);

    useEffect(() => {
        const total = cart.reduce((acc, item) => acc + parseInt(item.price), 0);
        setTotalPrice(total);
    }, [cart]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedFormData = {
            ...formData,
            total_price: totalPrice,
        };
        axios.post("http://127.0.0.1:3000/api/orders", updatedFormData)
            .then((res) => {
                setSubmittedData(updatedFormData);
                setOrderSuccess(true);
                navigate("/payPal");
            })
            .catch((err) => { console.log("errore nell'invio dati", err.response.data) });
    };

    return (
        <div className="container my-5 d-flex justify-content-center">
            <div className="card defaultcard shadow-lg border-0 rounded-4 p-4" style={{ maxWidth: 500, width: "100%" }}>
                <h2 className="mb-3 text-success fw-bold text-center">
                    <i className="fa fa-address-card me-2"></i>Checkout
                </h2>
                <p className="mb-4 text-center">Compila i dati per la spedizione e il pagamento.</p>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="mb-3 col-md-6">
                            <label className="form-label">Nome</label>
                            <input
                                type="text"
                                className="form-control"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                                required
                                placeholder="Serafino"
                            />
                        </div>
                        <div className="mb-3 col-md-6">
                            <label className="form-label">Cognome</label>
                            <input
                                type="text"
                                className="form-control"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                required
                                placeholder="Vipera"
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Indirizzo</label>
                        <input
                            type="text"
                            className="form-control"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            placeholder="Via dei Serpenti 10, Roma"
                        />
                    </div>
                    <div className="row">
                        <div className="mb-3 col-md-6">
                            <label className="form-label">Telefono</label>
                            <input
                                type="tel"
                                className="form-control"
                                name="phone_number"
                                value={formData.phone_number}
                                onChange={handleChange}
                                required
                                placeholder="333 1234567"
                            />
                        </div>
                        <div className="mb-3 col-md-6">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="serafino.vipera@reptimail.com"
                            />
                        </div>
                    </div>
                    <div className="d-flex justify-content-between gap-2 mt-4">
                        <button
                            className="btn btnblog"
                            type="button"
                            onClick={onBack}
                        >
                            <i className="fa fa-arrow-left me-2"></i>Indietro
                        </button>
                        <button type="submit" className="btn btnblog px-4">
                            Conferma e vai al pagamento <i className="fa fa-arrow-right ms-2"></i>
                        </button>
                    </div>
                    {submittedData && orderSuccess &&
                        <div className="alert alert-success mt-4">
                            Ordine effettuato con successo!<br />
                            Spedire a: <strong>{formData.first_name} {formData.last_name}</strong> - Indirizzo: <strong>{formData.address}</strong> - <br />
                            Email: <strong>{formData.email}</strong> - Prezzo totale ordine: <strong>{submittedData.total_price} €</strong>
                        </div>
                    }
                </form>
            </div>
        </div>
    );
}