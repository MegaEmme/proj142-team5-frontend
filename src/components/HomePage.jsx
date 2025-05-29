import Carousel from "./Carousel";
import FunFactSection from "./FunFact";
import Jumbotron from "./Jumbotron";

export default function HomePage() {
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

            <Carousel />

            <div className="card container w-75 mb-3 py-2 bg-danger">
                sezione 1 con i serpenti recenti da aggiungere!
            </div>

            <div className="card container w-75 mb-3 py-2 bg-danger">
                sezione 1 con i serpenti in sconto da aggiungere!
            </div>

            <div className="card container w-75 mb-3 py-2">
                <h2>scopri interessanti funfact sui serpenti!</h2>
            </div>
            <FunFactSection />

        </>
    )
};