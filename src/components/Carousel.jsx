import blogs from "../data/blogPosts";
import { Link } from "react-router-dom";

export default function Carousel() {
    return (
        <div className="defaultcard">
            <div
                id="carouselExampleCaptions"
                className="carousel card defaultcard slide rounded-4 overflow-hidden "
                data-bs-ride="carousel"
                data-bs-interval="3000"
                style={{
                    aspectRatio: "3 / 2", // mantiene proporzione
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
                                }}
                            />
                            <div className="defaultcard carousel-caption flex-column align-items-center justify-content-center p-2 rounded-4">
                                <h5 className="fw-bold text-center fs-4">{blog.title}</h5>
                                <p className="text-center m-0 p-0 d-none d-md-block">{blog.excerpt}</p>
                                <Link to={`/blog/${blog.id}`}>
                                    <button className="btn btnblog mt-2 p-2">Leggi di più</button>
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
