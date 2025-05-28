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
            <img src={image} alt={title} />
            <h1>{title}</h1>
            <h2>categoria: {category}</h2>
            <p>{text}</p>
            <p>{author}</p>
            <p>{date}</p>
        </div>
    )
}