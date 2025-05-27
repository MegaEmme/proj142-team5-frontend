import { useContext, useEffect, useState } from "react";
import axios from "axios";
import GlobalContext from "../contexts/globalcontext";
import SnakeCard from "../components/SnakeCard";
import Jumbotron from "../components/Jumbotron";

const SnakesPage = () => {

    const [snakes, setSnakes] = useState([]);
    const [search, setSearch] = useState('');
    const { setIsLoading } = useContext(GlobalContext);

    function getSnakes() {

        setIsLoading(true);

        axios.get('http://127.0.0.1:3000/api/snakes', {
            params: {
                search
            }
        })
            .then(response => {
                setSnakes(response.data);
            })
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false))
    };

    function searchSnakes(e) {
        e.preventDefault();
        getSnakes();
    };

    useEffect(getSnakes, []);

    return (
        <>
            <Jumbotron />
            <header className="d-flex justify-content-between mb-3 align-items-center">
                <h1 className="text-center mb-4">Serpenti</h1>
            </header>
            <section>
                <div className="d-flex justify-content-between">
                    <h2>Lista serpenti:</h2>
                    <form className="row g-1" onSubmit={searchSnakes}>
                        <div className="col-auto">
                            <label className="visually-hidden">Ricerca serpente</label>
                            <input type="text" className="form-control" placeholder="Ricerca serpente..." value={search} onChange={(e) => setSearch(e.target.value)} />
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary mb-3">Cerca</button>
                        </div>
                    </form>
                </div>
                <div className="row mt-auto h-100">
                    {snakes.length ? snakes.map(snake => (
                        <div className="col-12 col-md-6 col-lg-4 col-xl-3" key={snake.id}>
                            <SnakeCard data={snake} />
                        </div>
                    )) : <div>Serpente non trovato </div>}
                </div>
            </section>
        </>
    )
};

export default SnakesPage;