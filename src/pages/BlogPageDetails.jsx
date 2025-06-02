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
        <div className="card p-3 my-5 defaultcard p-5">

            <h2 className="fs-1 text-center">{title}</h2><br />
            <h4 className="fs-3 text-center">categoria: {category}</h4><br />
            <p>
                <img src={image} alt={title} className="img-blog-detail w-50 float-start me-4" />{text}
            </p>
            <div className="d-flex justify-content-between mt-3">
                <p>{author}</p>
                <p>{date}</p>
            </div>


        </div>
    )
}