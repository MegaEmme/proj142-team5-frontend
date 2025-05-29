import { useEffect, useState } from "react";
import axios from "axios";
import Jumbotron from "../components/Jumbotron";
import SnakeDetailCard from "../components/SnakeDetailCard";
import { useParams } from "react-router-dom";




const SnakeDetailPage = () => {

    const { slug } = useParams();
    const [currentSnake, setCurrentSnake] = useState(null);

    useEffect(() => {
        if (slug) {
            axios.get(`http://127.0.0.1:3000/api/snakes/${slug}`)
                .then(res => {
                    setCurrentSnake(res.data);
                })
                .catch(err => {
                    console.log(err);
                    setCurrentSnake(null)
                })
        }
    }, [slug])

    console.log(currentSnake)

    if (currentSnake) {
        return (
            <>

                <SnakeDetailCard data={currentSnake} />

                <button type="button" class="btn btn-light mb-5">Aggiungi al carrelo</button>
            </>
        )
    }

};

export default SnakeDetailPage;