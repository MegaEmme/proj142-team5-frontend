// src/pages/CancelPayment.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CancelPayment() {
  const navigate = useNavigate();

  // ✅ Redireziona dopo 6 secondi allo shop
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/snakes");
    }, 6000);
    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="container d-flex align-items-center justify-content-center main-content">
      <div className="defaultcard text-center p-5">
        <h2 className="text-danger fw-bold mb-3">Pagamento annullato ❌</h2>
        <p className="fs-5">Qualcosa è andato storto oppure hai interrotto il pagamento.</p>
        <p className="mb-4">Puoi riprovare o tornare a navigare lo shop.</p>
        <button className="btn btn-outline-style" onClick={() => navigate("/snakes")}>
          Torna allo shop
        </button>
      </div>
    </div>
  );
}
