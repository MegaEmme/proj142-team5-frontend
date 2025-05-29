const SnakeCard = ({ data }) => {
  const {
    common_name,
    scientific_name,
    difficulty,
    temperament,
    sex,
    description,
    price,
    image,
    morph
  } = data;

  return (
    <div className="card snakecard bg-tertiary h-100">
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <h3 className="card-title text-center">{common_name}</h3>
          <h4 className="card-title text-center fst-italic">({scientific_name})</h4>
        </div>
        <img src={`./snake-imgs/${image}`} alt={common_name} />
        <div>
          <p className="mb-1 mt-3">Difficoltà: <strong>{difficulty}</strong></p>
          <p className="mb-1">Temperamento: <strong>{temperament}</strong></p>
          <p className="mb-1">Sesso: <strong>{sex}</strong></p>
          <p className="mb-1">Morph: <strong>{morph}</strong></p>
          <p className="mb-4">{description}</p>
        </div>
        <div>
          <p className="mb-4 fs-3">Prezzo: <strong>{price}€</strong></p>
          <p className="mb-2 price p-2 rounded-3 fs-6"><strong>aggiungi al carrello</strong></p>
        </div>

      </div>
    </div>
  );
};

export default SnakeCard;
