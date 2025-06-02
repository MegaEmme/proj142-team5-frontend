import { useState } from 'react';
import axios from 'axios';

export default function CheckoutPage() {

    const [formData, setFormData] = useState({
        status: 'pagato',
        total_price: 0,
        payment_method: 'Paypal',
        first_name: '',
        last_name: '',
        address: '',
        phone_number: '',
        email: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("http://127.0.0.1:3000/api/orders", formData)
            .then((res) => { console.log("dati inviati con successo") })
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

                    <button type="submit" className="btn btn-primary">Conferma</button>
                </form>
            </div>
        </div>



    );

}