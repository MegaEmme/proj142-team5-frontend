import Carousel from "./Carousel";
import FunFactSection from "./FunFact";
import axios from "axios";
import GlobalContext from "../contexts/globalcontext";
import { useContext, useEffect, useState } from "react";
import SnakeCard from "./SnakeCard";

export default function HomePage() {
    const { setIsLoading } = useContext(GlobalContext);
    const [discountedSnakes, setDiscountedSnakes] = useState([]);
    const [newBornSnakes, setNewBornSnakes] = useState([]);
    const [discount, setDiscount] = useState(null);

    useEffect(() => {
        getDiscountedSnakes();
        getNewBornSnakes();
    }, []);

    function getDiscountedSnakes() {
        setIsLoading(true);
        axios
            .get("http://127.0.0.1:3000/api/snakes", {
                params: {
                    discount: discount !== 0,
                },
            })
            .then((res) => setDiscountedSnakes(res.data))
            .catch((err) => console.error("Errore:", err))
            .finally(() => setIsLoading(false));
    }

    function getNewBornSnakes() {
        setIsLoading(true);
        axios
            .get("http://127.0.0.1:3000/api/snakes", {
                params: {
                    sort: "birth",
                },
            })
            .then((res) => setNewBornSnakes(res.data))
            .catch((err) => console.error("Errore:", err))
            .finally(() => setIsLoading(false));
    }

    return (
        <>
            {/* Sezione Benvenuto */}
            <div className="container-fluid py-4">
                <div className="bg-dark bg-opacity-75 text-white text-center px-5 py-4 rounded-4 mx-auto w-100 mb-4 mt-5 shadow">

                    {/* Icona decorativa opzionale */}
                    <div className="mb-2">
                        <i className="fa-solid fa-dragon fa-2x text-success"></i>
                    </div>

                    <h2 className="fw-bold">
                        Benvenuto su <span className="text-success">Sergente Serpente!</span>
                    </h2>

                    {/* Linea decorativa */}
                    <hr className="border border-success border-2 opacity-50 w-25 mx-auto my-3" />

                    <p className="mt-3 px-md-4">
                        Scopri il lato affascinante e misterioso del mondo dei serpenti.
                        <span className="d-block mt-3">
                            In questo spazio unico, selezioniamo per te solo esemplari allevati con cura,
                            passione e rispetto per la loro natura.
                        </span>
                        <span className="d-block mt-3">
                            Preparati a incontrare creature straordinarie, sane, robuste e pronte a diventare
                            compagne uniche nella tua avventura esotica.
                        </span>
                    </p>

                    <a href="/snakes" className="btn btnblog mt-4 px-4 py-2 fs-5 rounded-pill">
                        🐍 Scopri i nostri esemplari
                    </a>
                </div>
            </div>



            {/* Carousel */}
            <div className="d-flex justify-content-center">
                <Carousel />
            </div>

            {/* Griglia serpenti scontati */}
            <div className="container w-75 mb-3 py-2">
                <h2 className="text-center text-white">Serpenti in sconto!</h2>
                <div className="row mt-4 h-100">
                    {discountedSnakes?.map((discountedSnake) => (
                        <div
                            className="col-12 col-md-6 col-lg-4 mb-4"
                            key={discountedSnake.id}
                        >
                            <SnakeCard data={discountedSnake} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Griglia serpenti appena nati */}
            <div className="container w-75 mb-3 py-2">
                <h2 className="text-center text-white">Nascite recenti</h2>
                <div className="row mt-4 h-100">
                    {newBornSnakes?.slice(0, 6).map((newBornSnake) => (
                        <div
                            className="col-12 col-md-6 col-lg-4 mb-4"
                            key={newBornSnake.id}
                        >
                            <SnakeCard data={newBornSnake} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Sezione Fun Fact */}
            <div className="card container w-75 mb-3 py-2 blogcard">
                <h2>Scopri interessanti fun fact sui serpenti!</h2>
            </div>
            <FunFactSection />
        </>
    );
}
