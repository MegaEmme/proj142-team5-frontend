import funFacts from "../data/funFacts"

export default function FunFactSection() {
    return (
        <>
            <div className="funfacts-container">
                {funFacts.length ? (
                    <ul className='list-unstyled d-flex flex-wrap gap-3'>
                        {funFacts.map(fact => (
                            <div className="card" key={fact.id}>
                                <img src={fact.image} className="card-img-top" alt={fact.titolo} />
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