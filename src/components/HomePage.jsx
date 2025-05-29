import Carousel from "./Carousel";
import FunFactSection from "./FunFact";
import Jumbotron from "./Jumbotron";
import axios from "axios";
import GlobalContext from "../contexts/globalcontext";
import { useContext, useEffect, useState } from "react";
import SnakeCard from "./SnakeCard";

export default function HomePage() {

    const { setIsLoading } = useContext(GlobalContext);
    const [snakes, setSnakes] = useState([]);
    const [discount, setDiscount] = useState(null);
    const [birth, setBirth] = useState(null);




    function getSnakes() {
        setIsLoading(true);
        axios.get("http://127.0.0.1:3000/api/snakes", {
            params: {                
                discount: discount !== 0,
                birth
            }
        })
            .then(res => setSnakes(res.data))
            .catch(err => console.error("Errore:", err))
            .finally(() => setIsLoading(false));
    }

    useEffect(() => {
        getSnakes();
    }, [discount, birth]);

    return (
        <>
            <Jumbotron />

            <div className="card text-center mb-3 blogcard w-75">
                <div className="card-body">
                    <h5 className="card-title">Benvenuto su <strong>Sergente Serpente!</strong> </h5>
                    <p className="card-text">Sei nel posto giusto per scoprire il fascino ineguagliabile di questi magnifici rettili. Qui a Sergente Serpente, ti offriamo una selezione curata di serpenti, allevati con passione e dedizione per garantirti esemplari sani, robusti e pronti ad arricchire la tua vita. Esplora la nostra collezione e trova il compagno squamato perfetto per te!</p>
                    <a href="/snakes" className="btn btnblog">Dai un'occhiata ai nostri esemplari</a>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <Carousel />
            </div>

            {/* griglia serpenti scontati */}
            <div className="card container w-75 mb-3 py-2 bg-danger">
                <h2 className= "text-center">Serpenti in sconto!</h2>
                <div className="row mt-4 h-100">
                    {snakes.length > 0 ? (
                        snakes.map((snake => 
                            <div className="col-12 col-md-6 col-lg-4 mb-4" key={snake.id}>
                                <SnakeCard data={snake} />
                            </div>
                        ))
                    ) : (
                        <p className="text-white">Nessun serpente trovato.</p>
                    )}
                </div>
            </div>


            {/* griglia serpenti appena nati
            <div className="card container w-75 mb-3 py-2 bg-danger">
                <h2 className="text-center">Nascite recenti</h2>
                <div className="row mt-4 h-100">
                    {snakes.length > 0 ? (
                        filteredSankes.map((filteredSnake =>
                            <div className="col-12 col-md-6 col-lg-4 mb-4" key={filteredSnake.id}>
                                <SnakeCard data={filteredSnake} />
                            </div>
                        ))
                    ) : (
                        <p className="text-white">Nessun serpente trovato.</p>
                    )}
                </div>
            </div> */}

            <div className="card container w-75 mb-3 py-2 blogcard">
                <h2>scopri interessanti funfact sui serpenti!</h2>
            </div>
            <FunFactSection />

        </>
    )
};