import funFacts from "../data/funFacts"

export default function FunFactSection() {
    return (
        <>
            <div className="funfacts-container">
                {funFacts.length ? (
                    <ul className='list-unstyled d-flex flex-wrap gap-3'>
                        {funFacts.map(fact => (
                            <div className="card d-flex flex-row p-2 funfactcard w-75" key={fact.id}>
                                <div className=" p-3 rounded-4">
                                    <img src={fact.image} className="card-img-top " alt={fact.titolo} />
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">{fact.titolo}</h5>
                                    <p className="card-text">{fact.contenuto}</p>
                                </div>
                            </div>
                        ))}
                    </ul>
                ) : <div>facts were not found</div>}
            </div>
        </>
    )
}