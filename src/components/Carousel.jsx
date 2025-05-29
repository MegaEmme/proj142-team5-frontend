import blogs from "../data/blogPosts";
import { Link } from "react-router-dom";

export default function Carousel() {


    return (
        <div className="d-flex justify-content-center align-items-center my-5 w-75 rounded-3 carosello">
            <div
                id="carouselExampleCaptions"
                className="carousel slide"
                data-bs-ride="carousel"
                data-bs-interval="3000"
            >
                <div className="carousel-indicators">
                    <button
                        type="button"
                        data-bs-target="#carouselExampleCaptions"
                        data-bs-slide-to="0"
                        className="active"
                        aria-current="true"
                        aria-label="Slide 1"
                    ></button>
                    <button
                        type="button"
                        data-bs-target="#carouselExampleCaptions"
                        data-bs-slide-to="1"
                        aria-label="Slide 2"
                    ></button>
                    <button
                        type="button"
                        data-bs-target="#carouselExampleCaptions"
                        data-bs-slide-to="2"
                        aria-label="Slide 3"
                    ></button>
                </div>

                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img
                            src={blogs[0].image}
                            className="d-block w-100"
                            alt={blogs[0].title}
                        />
                        <div className="carousel-caption d-none d-md-block  rounded-3 carosellotext">
                            <h6><strong>{blogs[0].title}</strong></h6>
                            <p>{blogs[0].excerpt}</p>
                            <Link to={`/blog/${blogs[0].id}`} className="text-center">
                                <button className="btn btnblog">Leggi di più</button>
                            </Link>
                        </div>
                    </div>

                    <div className="carousel-item">
                        <img
                            src={blogs[1].image}
                            className="d-block w-100"
                            alt={blogs[1].title}
                        />
                        <div className="carousel-caption d-none d-md-block  rounded-3 carosellotext">
                            <h6><strong>{blogs[1].title}</strong></h6>
                            <p>{blogs[1].excerpt}</p>
                            <Link to={`/blog/${blogs[1].id}`} className="text-center">
                                <button className="btn btnblog">Leggi di più</button>
                            </Link>
                        </div>
                    </div>

                    <div className="carousel-item">
                        <img
                            src={blogs[2].image}
                            className="d-block w-100"
                            alt={blogs[2].title}
                        />
                        <div className="carousel-caption d-none d-md-block rounded-3 carosellotext">
                            <h6><strong>{blogs[2].title}</strong></h6>
                            <p>{blogs[2].excerpt}</p>
                            <Link to={`/blog/${blogs[2].id}`} className="text-center">
                                <button className="btn btnblog">Leggi di più</button>
                            </Link>
                        </div>
                    </div>
                </div>

                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide="prev"
                >
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>

                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide="next"
                >
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
}
