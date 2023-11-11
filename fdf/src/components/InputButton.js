import React, { useState } from 'react';
import '../button.css'

const InputButton = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    return (
        <div className='buttonInput'>
            <label htmlFor="fileInput">Import your map</label>
            <input type="file" id="fileInput" accept=".fdf" onChange={handleFileChange} />
        </div>
    );
}

export default InputButton;