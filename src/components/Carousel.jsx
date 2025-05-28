export default function Carousel() {
    return (
        <>
            <div id="carouselExampleSlidesOnly" className="carousel slide fs-5 " data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="/istockphoto-157479804-612x612.jpg" className="d-block w-75 mx-auto" alt="..." />
                    </div>

                    <div className="carousel-item">
                        <img src="/istockphoto-487506120-612x612.jpg" className="d-block w-75 mx-auto" alt="..." />
                    </div>

                    <div className="carousel-item">
                        <img src="/istockphoto-1304421737-612x612.jpg" className="d-block w-75 mx-auto" alt="..." />
                    </div>

                    <div className="carousel-item">
                        <img src="/istockphoto-1298772937-612x612.jpg" className="d-block w-75 mx-auto" alt="..." />
                    </div>

                    <div className="carousel-item">
                        <img src="/serpentecorallo.avif" className="d-block w-75 mx-auto" alt="..." />
                    </div>

                </div>
            </div>
        </>
    )
}