import React, { useState, useRef } from "react";
import '../css/ImageScrollList.css'
import AddMap from "./AddMap";

const ImageScrollList = ({ handleClick  }) => {
    const images = [
        { url: '/pyramide.png', name: 'pyramide' },
        { url: '/pylone.png', name: 'pylone' },
        { url: '/elem2.png', name: 'elem2' },
        { url: '/flat.png', name: 'flat' },
    ];

    const containerRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - containerRef.current.offsetLeft);
        setScrollLeft(containerRef.current.scrollLeft);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - containerRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        containerRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    return (
        <div
            className="image-list-container"
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            <div className="scrolling-wrapper">
                <AddMap handleClick={handleClick} />
                {images.map((image, index) => (
                    <div key={index} className="image-item" onClick={() => handleClick(image.name)}>
                        <img src={image.url} alt={`Image ${index + 1}`} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ImageScrollList;