// src/components/Footer.js
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebookF,
    faTwitter,
    faInstagram,
    faLinkedinIn,
    faCcVisa,
    faCcMastercard,
    faCcPaypal,
    faCcAmex,
} from '@fortawesome/free-brands-svg-icons';
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

// Assicurati di aver installato Font Awesome per React:
// npm install @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/free-brands-svg-icons @fortawesome/react-fontawesome

const Footer = () => {
    return (
        <footer className="bg-dark text-white pt-5 pb-4">
            <div clasName="Container">
                <div className="mb-4 row mx-3">
                    <div className="mb-4 mb-lg-0 col col-lg-3 col-md-6">
                        <h5 className="text-uppercase fw-bold mb-4 text-success">
                            Sergente Serpente
                        </h5>
                        <p>
                            La tua scelta per acquistare serpenti. Ci impegniamo a offrire esemplari sani e un servizio clienti eccellente.
                        </p>
                        <div className="d-flex social-links mt-3">
                            <a href="#" className="text-white me-3" aria-label="Facebook">
                                <FontAwesomeIcon icon={faFacebookF} size="lg" />
                            </a>
                            <a href="#" className="text-white me-3" aria-label="Twitter">
                                <FontAwesomeIcon icon={faTwitter} size="lg" />
                            </a>
                            <a href="#" className="text-white me-3" aria-label="Instagram">
                                <FontAwesomeIcon icon={faInstagram} size="lg" />
                            </a>
                            <a href="#" className="text-white" aria-label="LinkedIn">
                                <FontAwesomeIcon icon={faLinkedinIn} size="lg" />
                            </a>
                        </div>
                    </div>

                    {/* Sezione Link Utili */}
                    <div className="col col-lg-2 col-md-6 mb-4 mb-lg-0">
                        <h5 className="text-uppercase fw-bold mb-4 text-success">Link Utili</h5>
                        <ul className="list-unstyled">

                            <li><Link to="/" className="text-white text-decoration-none">Home</Link></li>
                            <li><Link to="/snakes" className="text-white text-decoration-none">Shop</Link></li>
                            <li><Link to="/blog" className="text-white text-decoration-none">blog</Link></li>
                            <li><Link to="/cart" className="text-white text-decoration-none">Carrello</Link></li>
                        </ul>
                    </div>

                    {/* Sezione Servizio Clienti */}
                    <div className="col col-lg-3 col-md-6 mb-4 mb-md-0">
                        <h5 className="text-uppercase fw-bold mb-4 text-success">Servizio Clienti</h5>
                        <ul className="list-unstyled">
                            <li><a href="#" className="text-white text-decoration-none">Contattaci</a></li>
                            <li><a href="#" className="text-white text-decoration-none">FAQ</a></li>
                            <li><a href="#" className="text-white text-decoration-none">Spedizione & Resi</a></li>
                            <li><a href="#" className="text-white text-decoration-none">Termini & Condizioni</a></li>
                            <li><a href="#" className="text-white text-decoration-none">Privacy Policy</a></li>
                        </ul>
                    </div>

                    {/* Sezione Contatti */}
                    <div className="col col-lg-4 col-md-6 mb-4 mb-md-0">
                        <h5 className="text-uppercase fw-bold mb-4 text-success">Contatti</h5>
                        <p>
                            <FontAwesomeIcon icon={faMapMarkerAlt} className="me-3 text-success" />
                            Via dei Serpenti, 00184 Roma RM, Italia.
                        </p>
                        <p>
                            <FontAwesomeIcon icon={faPhone} className="me-3 text-success" />
                            +39 666 666 666
                        </p>
                        <p>
                            <FontAwesomeIcon icon={faEnvelope} className="me-3 text-success" />
                            <a href="mailto:info@sergenteserpente.it" className="text-white text-decoration-none">info@sergenteserpente.it</a>
                        </p>
                    </div>
                </div>

                {/* Riga Separatore */}
                <hr className="my-3 text-white-50" />

                {/* Sezione Copyright e Pagamenti */}
                <div Row className="align-items-center mx-3 d-flex justify-content-center">
                    <div className="col col-md-6 text-center text-md-start mb-3 mb-md-0">
                        <p className="mb-0">&copy; {new Date().getFullYear()} Sergente Serpente. Tutti i diritti riservati.</p>
                    </div>
                    <div className="col col-md-6 text-center text-md-end">
                        <div className="payment-methods">
                            <FontAwesomeIcon icon={faCcVisa} size="2x" className="me-2 text-secondary" aria-label="Visa" />
                            <FontAwesomeIcon icon={faCcMastercard} size="2x" className="me-2 text-secondary" aria-label="Mastercard" />
                            <FontAwesomeIcon icon={faCcPaypal} size="2x" className="me-2 text-secondary" aria-label="PayPal" />
                            <FontAwesomeIcon icon={faCcAmex} size="2x" className="text-secondary" aria-label="American Express" />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;



// export default function Footer() {
//     return (
//         <div className="d-flex justify-content-center align-items-center py-5 mt-5 bg-black">
//             <div className="text-white">footer</div>
//         </div>
//     )
// };