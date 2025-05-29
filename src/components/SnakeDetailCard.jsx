

const SnakeDetailCard = ({ data }) => {
    const {
        common_name,
        scientific_name,
        difficulty,
        temperament,
        sex,
        description,
        price,
        image,
        morph,
        discount
    } = data;

    return (

        <>
            <div className="card details">
                <img src={`../snake-imgs/${image}`} className="card-img-top" alt={scientific_name} />
                <div className="card-body">
                    <h5 className="card-title"><strong>{scientific_name}</strong>  </h5>
                    <p className="card-text">Conosciuto come <strong>{common_name}</strong> , è un {description}</p>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Sesso: <strong>{sex.toUppercase()}</strong> </li>
                        <li class="list-group-item">Temperamento: <strong>{temperament}</strong>  </li>
                        <li class="list-group-item">Morfologia: <strong>{morph}</strong>  </li>
                        <li class="list-group-item">Difficoltà: <strong>{difficulty}</strong> </li>
                        <li class="list-group-item">Prezzo: <strong>€{price}</strong></li>
                    </ul>
                </div>
            </div>

        </>

    );
};

export default SnakeDetailCard;