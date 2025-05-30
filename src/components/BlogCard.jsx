import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
    return (
        <div className="mb-5 p-3 card  defaultcard shadow-sm">
            <div className="h-100 d-flex flex-column flex-md-row">
                {/* WRAPPER IMMAGINE */}
                <div className=" mb-3 mb-md-0 w-25 flex-shrink-0">
                    <img
                        src={blog.image}
                        className="blogcard-img rounded-3"
                        alt={blog.title}
                    />
                </div>

                {/* CONTENUTO TESTUALE */}
                <div className="mx-3 w-75 p-2 d-flex flex-column">
                    <h2 className=" my-2">{blog.title}</h2>
                    <h4 className="mb-2 my-2">{blog.category}</h4>
                    <h5 className=" my-2">{blog.excerpt}</h5>
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
