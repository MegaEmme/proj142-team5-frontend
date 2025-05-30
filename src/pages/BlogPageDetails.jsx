import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import blogs from "../data/blogPosts";

export default function BlogPageDetails() {

    const { id } = useParams()
    const {
        title,
        category,
        text,
        image,
        author,
        date
    } = blogs[id - 1]

    return (
        <div className="card p-3 my-5 blogcard">

            <p><img src={image} alt={title} className="img-blog-detail m-4" />
                <span className="fs-1">{title}</span><br />
                <span className="fs-2">categoria: {category}</span><br />
                <span>{text}</span><br />
            </p>
            <div className="d-flex justify-content-between mt-3">
                <p>{author}</p>
                <p>{date}</p>
            </div>
        </div>
    )
}