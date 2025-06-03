import { useState, useContext, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {

    clearCart,

} from "../utils/cartUtils";
import GlobalContext from "../contexts/globalcontext";


export default function CheckoutPage() {




    const handleClearCart = () => {
        clearCart();
        setCart([]);
    };

    const navigate = useNavigate();
    const { cart, setCart } = useContext(GlobalContext);
    const [totalPrice, setTotalPrice] = useState(0)
    const [submittedData, setSubmittedData] = useState(null);



    const [formData, setFormData] = useState({
        status: 'pagato',
        payment_method: 'Paypal',
        first_name: '',
        last_name: '',
        address: '',
        phone_number: '',
        email: '',
    });

    const [orderSuccess, setOrderSuccess] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    useEffect(() => {
        const total = cart.reduce((acc, item) => acc + parseInt(item.price), 0);
        setTotalPrice(total);
    }, [cart]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedFormData = {
            ...formData,
            total_price: totalPrice,
        };

        axios.post("http://127.0.0.1:3000/api/orders", updatedFormData)
            .then((res) => {
                console.log("dati inviati con successo");
                setSubmittedData(updatedFormData);
                setOrderSuccess(true)
                handleClearCart()
            })
            .catch((err) => { console.log("errore nell'invio dati", err.response.data) })

    }

    return (

        <div className="card my-4 defaultcard">
            <div className="card-body">

                <h2 className="mb-4">Inserisci i tuoi dati</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Nome</label>
                        <input
                            type="text"
                            className="form-control"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Cognome</label>
                        <input
                            type="text"
                            className="form-control"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            required
                        />
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
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Telefono</label>
                        <input
                            type="tel"
                            className="form-control"
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn btnblog mb-3">Conferma</button>


                    {submittedData && orderSuccess &&
                    <div className={`bg-success p-4 rounded ${orderSuccess ? "" : "visually-hidden"}`}>Ordine effettuato con successo:
                        Spedire a: { }<strong>
                            {formData.first_name} {formData.last_name}</strong> -
                        Indirizzo: { }<strong>
                            {formData.address}</strong> - { }
                        mail: <strong>{formData.email}</strong> -
                        Prezzo totale ordine: <strong>{submittedData.total_price} €</strong>
                    </div>}
                </form>
            </div>
        </div>



    );

}