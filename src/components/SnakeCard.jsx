const SnakeCard = ({ data }) => {
  const {
    common_name,
    scientific_name,
    difficulty,
    temperament,
    sex,
    description,
    price
  } = data;

  return (
    <div className="card bg-tertiary h-100">
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <h3 className="card-title text-center">{common_name}</h3>
          <h4 className="card-title text-center "><small className="text-muted">({scientific_name})</small></h4>
        </div>
        <div>

          <p className="mb-1 mt-3">Difficoltà: <strong>{difficulty}</strong></p>
          <p className="mb-1">Temperamento: <strong>{temperament}</strong></p>
          <p className="mb-1">Sesso: <strong>{sex}</strong></p>
          <p className="card-text mb-4">{description}</p>
        </div>
        <div>
          <p className="mb-2">Prezzo: <strong>{price} €</strong></p>
        </div>

      </div>
    </div>
  );
};

export default SnakeCard;
