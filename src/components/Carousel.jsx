import blogs from "../data/blogPosts";
import { Link } from "react-router-dom";

export default function Carousel() {
    return (
        <div className="d-flex justify-content-center align-items-center my-5 w-100">
            <div
                id="carouselExampleCaptions"
                className="carousel slide"
                data-bs-ride="carousel"
                data-bs-interval="3000"
                style={{ maxWidth: "1200px", height: "400px" }}
            >
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

                <div className="carousel-inner">
                    {blogs.map((blog, index) => (
                        <div key={blog.id} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                            <img
                                src={blog.image}
                                className="d-block w-100"
                                alt={blog.title}
                                style={{ height: "400px", objectFit: "cover", objectPosition: "center" }}
                            />
                            <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded-3 p-3">
                                <h6><strong>{blog.title}</strong></h6>
                                <p>{blog.excerpt}</p>
                                <Link to={`/blog/${blog.id}`}>
                                    <button className="btn btnblog">Leggi di più</button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
}
