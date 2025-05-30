import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
    return (
        <div className="mb-5 p-3 card blogcard shadow-sm">
            <div className="h-100 d-flex flex-column flex-md-row">
                {/* WRAPPER IMMAGINE */}
                <div className="blogcard-img-container me-md-4 mb-3 mb-md-0">
                    <img
                        src={blog.image}
                        className="blogcard-img"
                        alt={blog.title}
                    />
                </div>

                {/* CONTENUTO TESTUALE */}
                <div className="d-flex flex-column">
                    <h2 className="text-truncate my-2">{blog.title}</h2>
                    <h4 className="mb-2 my-2">{blog.category}</h4>
                    <h5 className="flex-grow-1 my-2">{blog.excerpt}</h5>
                    <div className="d-flex justify-content-between align-items-center my-2 px-2 px-md-5">
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
