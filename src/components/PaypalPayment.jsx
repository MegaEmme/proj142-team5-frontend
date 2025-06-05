import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import GlobalContext from "../contexts/globalcontext";
import { useContext, useState } from "react";


const PaypalPayment = () => {

    const { submittedData, setCart } = useContext(GlobalContext);
    const [error, setError] = useState(null);

    const initialOptions = {
        clientId: import.meta.env.VITE_PAYPAL_CLIENTID,
        currency: "EUR",
        intent: "capture"
    };

    const styles = {
        shape: "rect",
        layout: "vertical",
    };

    if (!submittedData || !submittedData.total_price) {
        return (
            <div className="container mt-5">
                <div className="card defaultcard text-center p-5">
                    <h3 className="mb-0">Caricamento dati pagamento...</h3>
                </div>
            </div>
        );
    }

    // prezzo totale che passo a paypal
    const totalPrice = submittedData.total_price;
    const deliveryPrice = 75;

    const createOrder = async () => {
        try {
            const response = await fetch("http://localhost:3000/paypal/createorder", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ total: totalPrice < 250 ? totalPrice + deliveryPrice : totalPrice }),
            });
            
            if (!response.ok) {
                throw new Error("Errore nella creazione dell'ordine");
            }
            
            const orderData = await response.json();
            return orderData.orderId;
        } catch (err) {
            setError("Errore durante la creazione dell'ordine PayPal");
            throw err;
        }
    };

    const onApprove = async (data) => {
        try {
            const response = await fetch("http://localhost:3000/paypal/captureorder", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ orderId: data.orderID }),
            });
            const result = await response.json();
            if (result.status === "COMPLETED") {
                setCart([]); // Svuota il carrello solo se il pagamento è completato
                window.location.href = "/payPal/complete-payment";
            } else {
                window.location.href = "/payPal/cancel-payment";
            }
        } catch (error) {
            console.error("Error verifying PayPal order:", error);
            window.location.href = "/payPal/cancel-payment";
        }
    };

    const onError = (error) => {
        console.error("PayPal error", error);
        window.location.href = "/payPal/cancel-payment";
    };

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <div className="card defaultcard shadow p-4">
                        <div className="card-body">
                            <h2 className="mb-4 text-center">Pagamento con PayPal</h2>
                            {error && (
                                <div className="alert alert-danger mb-3">
                                    {error}
                                </div>
                            )}
                            <div className="mb-3 text-center">
                                <span className="fs-5">Totale da pagare:</span>
                                <span className="fs-3 ms-2 fw-bold text-success">
                                    {(totalPrice < 250 ? totalPrice + deliveryPrice : totalPrice).toFixed(2)} €
                                </span>
                                {totalPrice < 250 && (
                                    <div className="text-secondary mt-2">
                                        <small>Spedizione inclusa: {deliveryPrice.toFixed(2)} €</small>
                                    </div>
                                )}
                            </div>
                            <div className="d-flex justify-content-center">
                                <PayPalScriptProvider options={initialOptions}>
                                    <PayPalButtons
                                        style={{
                                            layout: "vertical",
                                            shape: "rect",
                                            label: "pay" // cambiato da "paypal" a "pay"
                                        }}
                                        createOrder={createOrder}
                                        onApprove={onApprove}
                                        onError={(err) => {
                                            setError("Si è verificato un errore durante il pagamento");
                                            onError(err);
                                        }}
                                        fundingSource="paypal" // aggiunto questo per forzare solo PayPal
                                        disableFunding={['card', 'credit', 'paylater']} // disabilita altri metodi
                                    />
                                </PayPalScriptProvider>
                            </div>
                            <div className="d-flex justify-content-center mt-4">
                                <button
                                    className="btn btn-outline-danger"
                                    type="button"
                                    onClick={() => window.location.href = "/"}
                                >
                                    Annulla
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaypalPayment;