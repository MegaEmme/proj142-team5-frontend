import funFacts from "../data/funFacts"

export default function FunFactSection() {
    return (
        <>
            <div className="funfacts-container">
                {funFacts.length ? (
                    <ul className='list-unstyled d-flex flex-wrap gap-3'>
                        {funFacts.map(fact => (
                            <div className='bg-warning-subtle shadow container card mb-3 flex-row justify-content-around' key={fact.id}>
                                <img className='w-25 m-3 rounded-2' src={fact.image} alt={fact.title} />
                                <div className='w-50'>
                                    <h3 className='p-2 m-4 text-center'> <i className='p-2 fa-solid fa-plane-departure text-warning'></i> {fact.title} <i className='p-2 fa-solid fa-plane-arrival text-warning'></i></h3>

                                    <p className='card-text text-center'> {fact.contenuto} </p>
                                </div>
                            </div>
                        ))}
                    </ul>
                ) : <div>facts were not found</div>}
            </div>
        </>
    )
}