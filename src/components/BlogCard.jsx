import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {

    return (
        <div className=" mb-5 p-3 card blogcard"> {/* Colonne Bootstrap per layout responsive */}
            <div className="h-100 shadow-sm d-flex flex-row"> {/* Card Bootstrap con altezza fissa e ombra */}
                <img
                    src={blog.image}
                    className="card-img-top img-fluid w-25 m-4" // img-fluid per responsività
                    alt={blog.title}
                />
                <div className="card-body d-flex flex-column">
                    <h2 className="card-title text-truncate my-2">{blog.title}</h2> {/* text-truncate se il titolo è lungo */}
                    <h4 className="card-subtitle mb-2 my-2">{blog.category}</h4>
                    <h5 className="card-text flex-grow-1 my-2">{blog.excerpt}</h5> {/* flex-grow-1 per occupare spazio */}
                    <div className="d-flex justify-content-between align-items-center my-2 px-5">
                        <small>di {blog.author}</small>
                        <small>{blog.date}</small>
                    </div>
                    <Link to={`/blog/${blog.id}`} className="text-center">
                        <button className="btn btnblog my-4 align-items-center px-4">Leggi di più</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;