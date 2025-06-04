import { Link } from "react-router-dom";
import { motion } from "framer-motion";
const CompletePayment = () => {
  return (
    <div className="container my-5 d-flex justify-content-center">
      <motion.div
        className="defaultcard p-4 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-success mb-3">✅ Pagamento completato!</h1>
        <p className="fs-5 mb-4">
          Grazie per aver acquistato da <strong>Sergente Serpente</strong>.
        </p>
        <Link to="/" className="btn btnblog">
          Torna alla Home
        </Link>
      </motion.div>
    </div>
  );
};

export default CompletePayment;
