import React, { useState } from 'react';
import '../css/button.css'
import '../css/grid.css'

const GridButton = () => {
    const grid = [
        {id: 1, content: 'pyramide'},
        {id: 2, content: 'pylone'},
        {id: 3, content: 'elem2'},
        {id: 4, content: 'flat'},
    ];
    return (
        <div className='grid-container'>
            {grid.map((item) => (
                <div key={item.id} className='grid-item button'>
                    {item.content}
                </div>
            ))}
        </div>
    );
}

export default GridButton;