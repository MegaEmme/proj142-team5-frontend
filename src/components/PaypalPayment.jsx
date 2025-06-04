import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import GlobalContext from "../contexts/globalcontext";
import { useContext } from "react";


const PaypalPayment = () => {

    const { submittedData } = useContext(GlobalContext);

    const initialOptions = {
        clientId: import.meta.env.VITE_PAYPAL_CLIENTID
    };

    const styles = {
        shape: "rect",
        layout: "vertical",
    };

    if (!submittedData || !submittedData.total_price) {
        return <div>Caricamento dati pagamento...</div>;
    }
    // prezzo totale che passo a paypal
    const totalPrice = submittedData.total_price

    const onCreateOrder = async () => {
        try {
            const response = await fetch("http://localhost:3000/paypal/createorder", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ total: totalPrice }),
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
        <>
            <div className="container mt-4">
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
        </>
    );
};

export default PaypalPayment;