export default function Pagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) return null;
    return (
        <nav className="d-flex justify-content-center my-3">
            <ul className="pagination blogcard">
                <li className={`page-item${currentPage === 1 ? ' disabled' : ''}`}>
                    <button className="page-link p-2 border-black bg-dark text-success" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>&laquo;</button>
                </li>
                {Array.from({ length: totalPages }, (_, i) => (
                    <li key={i + 1} className={`page-item${currentPage === i + 1 ? ' active' : ''}`}>
                        <button className="page-link p-2 border-black bg-dark text-success" onClick={() => onPageChange(i + 1)}>{i + 1}</button>
                    </li>
                ))}
                <li className={`page-item${currentPage === totalPages ? ' disabled' : ''}`}>
                    <button className="page-link p-2 border-black bg-dark text-success" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>&raquo;</button>
                </li>
            </ul>
        </nav>
    );
};