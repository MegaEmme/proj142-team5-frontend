// src/pages/CompletePayment.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CompletePayment() {
  const navigate = useNavigate();

  // ✅ Redireziona dopo 6 secondi alla homepage
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/");
    }, 6000);
    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="container d-flex align-items-center justify-content-center main-content">
      <div className="defaultcard text-center p-5">
        <h2 className="text-success fw-bold mb-3">Pagamento completato ✅</h2>
        <p className="fs-5">
          Grazie per il tuo acquisto su <strong>Sergente Serpente</strong>!
        </p>
        <p className="mb-4">Riceverai una conferma via email.</p>
        <button className="btn btnblog" onClick={() => navigate("/")}>
          Torna alla home
        </button>
      </div>
    </div>
  );
}
