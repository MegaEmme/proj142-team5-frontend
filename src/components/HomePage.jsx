import Carousel from "./Carousel";
import FunFactSection from "./FunFact";
import Jumbotron from "./Jumbotron";

export default function HomePage() {
    return (
        <>
            <Jumbotron />

            <div class="card text-center mb-3 blogcard w-75">
                <div class="card-body">
                    <h5 class="card-title">Benvenuto su <strong>Sergente Serpente!</strong> </h5>
                    <p class="card-text">Sei nel posto giusto per scoprire il fascino ineguagliabile di questi magnifici rettili. Qui a Sergente Serpente, ti offriamo una selezione curata di serpenti, allevati con passione e dedizione per garantirti esemplari sani, robusti e pronti ad arricchire la tua vita. Esplora la nostra collezione e trova il compagno squamato perfetto per te!</p>
                    <a href="/snakes" class="btn btnblog">Dai un'occhiata ai nostri esemplari</a>
                </div>
            </div>

            <Carousel />

            <FunFactSection />

        </>
    )
};