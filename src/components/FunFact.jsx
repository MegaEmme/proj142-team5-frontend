import funFacts from "../data/funFacts";

export default function FunFactSection() {
    return (
        <div className="container my-5 ">
            <div className="row justify-content-center ">
                {funFacts.length ? (
                    funFacts.map(fact => (
                        <div className="col-12 col-md-4 mb-4 " key={fact.id}>
                            <div className="card funfactcard-mini blogcard h-100 shadow-sm p-2 d-flex flex-column align-items-center">

                                <div className=" p-2 text-center">
                                    <img src={fact.image} className="card-img-top rounded-3 img-funfact" alt={fact.titolo} />
                                    <h6 className="mt-3">{fact.titolo}</h6>
                                    <p className="small">{fact.contenuto}</p>
                                </div>
                                {/* <button className="btn btnblog mt-2 btn-sm">Scopri di più</button> */}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-light text-center">Nessun fatto curioso trovato.</div>
                )}
            </div>
        </div>
    );
}
