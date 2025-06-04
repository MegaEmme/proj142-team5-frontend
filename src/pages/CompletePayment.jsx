import { Link } from "react-router-dom";

const CompletePayment = () => {
  return (
    <div className="payment-container">
      <h2 className="payment-heading">
        Grazie per aver scelto Sergente Serpente!
      </h2>
      <p className="payment-text">
        Il pagamento è stato completato con successo.
      </p>
      <Link to="/" className="payment-button">
        Torna alla HomePage
      </Link>
    </div>
  );
};

export default CompletePayment;
