

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
            <div className="card mb-3">
                <img src={`../snake-imgs/${image}`} className="card-img-top" alt={scientific_name} />
                <div className="card-body">
                    <h5 className="card-title">{scientific_name} </h5>
                    <p className="card-text">il {scientific_name}, conosciuto come {common_name}, è un {description}</p>
                    <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                </div>
            </div>

        </>

    );
};

export default SnakeDetailCard;