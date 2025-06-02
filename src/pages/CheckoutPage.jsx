import { useState } from 'react';

export default function CheckoutPage() {

    const [formData, setFormData] = useState({
        nome: '',
        cognome: '',
        indirizzo: '',
        telefono: '',
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
        console.log('Dati inviati:', formData);
        // Qui puoi aggiungere una chiamata API o altro
    };


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
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Cognome</label>
                        <input
                            type="text"
                            className="form-control"
                            name="cognome"
                            value={formData.cognome}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Indirizzo</label>
                        <input
                            type="text"
                            className="form-control"
                            name="indirizzo"
                            value={formData.indirizzo}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Telefono</label>
                        <input
                            type="tel"
                            className="form-control"
                            name="telefono"
                            value={formData.telefono}
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
};
