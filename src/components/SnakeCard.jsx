const SnakeCard = ({ data }) => {

    const { scientific_name, difficulty, temperament, sex, description, price } = data;

    return (
        <>
            <div className="card mb-5 bg-tertiary">
                <div className="card-body">
                    <h5 className="card-title text-center">Nome: {scientific_name}</h5>
                    <p>Difficoltà: <strong>{difficulty}</strong></p>
                    <p>Temperamento: <strong>{temperament}</strong></p>
                    <p>Sesso: <strong>{sex}</strong></p>
                    <p className="card-text">{description}</p>
                    <p>Prezzo: <strong>{price}</strong></p>
                </div>
            </div>
        </>
    )
};

export default SnakeCard;