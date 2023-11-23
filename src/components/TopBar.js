import React, { useState } from "react";
import '../css/TopBar.css';
import HelpIcon from '../help-circle.svg';

const TopBar = () => {
    const [hovered, setHovered] = useState(false);

    const handleMouseEnter = () => {
        setTimeout(() => {
            setHovered(true);
        }, 300);
    };

    const handleMouseLeave = () => {
        setTimeout(() => {
            setHovered(false);
        }, 600);
    };
    
    return (
        <div className="top-bar">
            <div
                className={`help-circle ${hovered ? 'active' : ''}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {hovered ? (
                    <div className="tooltip">
                        <p>Rotate x: q a</p>
                        <p>Rotate y: w s</p>
                        <p>Rotate z: e d</p>
                        <p>Zoom: + -</p>
                        <p>Move: arrow</p>
                    </div>
                ) : (
                    <img src={HelpIcon} alt="Help" />
                )}
            </div>
            <div className="header">WIREFRAME</div>
        </div>
    );
}

export default TopBar;