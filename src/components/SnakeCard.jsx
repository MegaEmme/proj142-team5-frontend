

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
    morph,
    discount
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
          <p className="mb-1">Sesso: <strong>{sex.toUpperCase()}</strong></p>
          <p className="mb-1">Morph: <strong>{morph}</strong></p>
          <p className="mb-4">{description}</p>
        </div>
        <div>
          <p className="mb-4 fs-3">Prezzo: <strong>{discount ? price-(price*discount) : price}€</strong></p>
          {discount > 0 && <p className="text-danger">SCONTATO DEL <strong>{discount * 100}%</strong></p>}
          {discount > 0 && <p className="text-danger">Prezzo originale: <strong className="text-decoration-line-through">{price}€</strong></p>}
          <div className="d-flex justify-content-between gap-2">
            <p className="mb-2 price p-2 rounded-3 fs-6"><strong>Più dettagli</strong></p>
            <p className="mb-2 price p-2 rounded-3 fs-6 bg-danger"><strong>Aggiungi al carrello</strong></p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SnakeCard;
