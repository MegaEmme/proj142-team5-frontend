// src/pages/BlogPage.js
import React from 'react';
import BlogCard from '../components/BlogCard'; // Importa il componente della card
import blogs from '../data/blogPosts';             // Importa l'array di dati

const BlogPage = () => {
    return (
        <div className="container mt-5"> {/* Contenitore Bootstrap con margine superiore */}
            <h1 className="mb-4 text-center card defaultcard py-3">Il Nostro Blog sui Serpenti</h1>
            <div> {/* Riga Bootstrap per le card */}
                {blogs.map((blog) => (
                    <BlogCard key={blog.id} blog={blog} /> // Mappa l'array e passa i dati a BlogCard
                ))}
            </div>
        </div>
    );
};

export default BlogPage;