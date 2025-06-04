import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import GlobalContext from "../contexts/globalcontext";
import { useContext } from "react";


const PaypalPayment = () => {

    const { submittedData, setCart } = useContext(GlobalContext);

    const initialOptions = {
        clientId: import.meta.env.VITE_PAYPAL_CLIENTID
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

    const onCreateOrder = async () => {
        try {
            const response = await fetch("http://localhost:3000/paypal/createorder", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ total: totalPrice < 250 ? totalPrice + deliveryPrice : totalPrice }),
            });
            const data = await response.json();
            return data.orderId;
        } catch (error) {
            console.error("Error creating PayPal order:", error);
            throw error;
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
                                        style={styles}
                                        createOrder={onCreateOrder}
                                        onApprove={onApprove}
                                        onError={onError}
                                        fundingSource="paypal"
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