import React, { useState } from 'react';
import '../button.css'

const GridButton = () => {
    const grid = [
        {id: 1, content: 'pyramide'},
        {id: 2, content: 'pylone'},
        {id: 3, content: 'elem2'},
        {id: 4, content: 'flat'},
    ];
    return (
        <div>
            {grid.map((item) => (
                <div key={item.id} className='grid-item'>
                    {item.content}
                </div>
            ))}
        </div>
    );
}

export default GridButton;