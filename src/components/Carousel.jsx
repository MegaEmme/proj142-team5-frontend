import blogs from "../data/blogPosts";
import { Link } from "react-router-dom";

export default function Carousel() {
    return (
        <div className="container py-4"> {/* container e non container-fluid */}
            <div
                id="carouselExampleCaptions"
                className="carousel slide shadow rounded-4 overflow-hidden bg-dark bg-opacity-75"
                data-bs-ride="carousel"
                data-bs-interval="3000"
                style={{
                    maxWidth: "1200px",   // limite fisso per evitare stretching
                    width: "100%",
                    aspectRatio: "3 / 1", // mantiene proporzione
                    margin: "0 auto",
                }}
            >
                {/* Indicatori */}
                <div className="carousel-indicators">
                    {blogs.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            data-bs-target="#carouselExampleCaptions"
                            data-bs-slide-to={index}
                            className={index === 0 ? "active" : ""}
                            aria-current={index === 0 ? "true" : undefined}
                            aria-label={`Slide ${index + 1}`}
                        ></button>
                    ))}
                </div>

                {/* Slide */}
                <div className="carousel-inner" style={{ height: "100%" }}>
                    {blogs.map((blog, index) => (
                        <div
                            key={blog.id}
                            className={`carousel-item ${index === 0 ? "active" : ""}`}
                            style={{ height: "100%" }}
                        >
                            <img
                                src={blog.image}
                                className="d-block w-100 h-100"
                                alt={blog.title}
                                style={{
                                    objectFit: "cover",
                                    objectPosition: "center",
                                    opacity: "0.6",
                                }}
                            />
                            <div className="carousel-caption d-none d-md-flex flex-column align-items-center justify-content-center bg-dark bg-opacity-75 p-4 rounded-4">
                                <h5 className="fw-bold text-center">{blog.title}</h5>
                                <p className="text-center">{blog.excerpt}</p>
                                <Link to={`/blog/${blog.id}`}>
                                    <button className="btn btnblog">Leggi di più</button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pulsanti di controllo */}
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
