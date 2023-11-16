import React, { useState } from 'react';
import '../css/button.css'

const InputButton = ({ handleFileChange }) => {
    const handleChange = (event) => {
        const fileInput = event.target;
        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const fileContent = e.target.result;
                handleFileChange(fileContent);
            }
            reader.readAsText(file);
        }
    };

    return (
        <div className='buttonInput button'>
            <label htmlFor="fileInput">Import your map</label>
            <input type="file" id="fileInput" accept=".fdf" onChange={handleChange} />
        </div>
    );
}

export default InputButton;