import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PaypalPayment = () => {

    const initialOptions = {
        clientId: import.meta.env.VITE_PAYPAL_CLIENTID
    };

    const styles = {
        shape: "rect",
        layout: "vertical",
    };

    const onCreateOrder = async () => {
        try {
            const response = await fetch("http://localhost:3000/paypal/createorder", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
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
                window.location.href = "/paypal/complete-payment";
            } else {
                window.location.href = "/paypal/cancel-payment";
            }
        } catch (error) {
            console.error("Error verifying PayPal order:", error);
            window.location.href = "/paypal/cancel-payment";
        }
    };

    const onError = (error) => {
        console.error("PayPal error", error);
        window.location.href = "/paypal/cancel-payment";
    };

    return (
        <>
            <h1>Paypal Payment Demo</h1>
            <PayPalScriptProvider options={initialOptions}>
                <PayPalButtons
                    style={styles}
                    createOrder={onCreateOrder}
                    onApprove={onApprove}
                    onError={onError}
                    fundingSource="paypal"
                />
            </PayPalScriptProvider>
        </>
    );
};

export default PaypalPayment;