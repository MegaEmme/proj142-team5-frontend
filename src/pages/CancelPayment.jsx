import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CancelPayment = () => {
  return (
    <div className="container my-5 d-flex justify-content-center">
      <motion.div
        className="defaultcard p-4 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-danger mb-3">❌ Pagamento annullato</h1>
        <p className="fs-5 mb-4">
          Il tuo ordine non è stato completato. Puoi riprovare in qualsiasi
          momento.
        </p>
        <Link to="/cart" className="btn btnblog">
          Torna al Carrello
        </Link>
      </motion.div>
    </div>
  );
};

export default CancelPayment;
