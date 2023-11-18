import React from "react";
import  '../css/AddMap.css';
import { ReactComponent as Icon} from '../add-circle.svg';


const AddMap = ({ handleClick }) => {
    const handleChange = (event) => {
        const fileInput = event.target;
        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const fileContent = e.target.result;
                handleClick(fileContent);
            }
            reader.readAsText(file);
        }
    }
    return (
        <div className='button'>
            <label htmlFor="fileInput">Import your map</label>
            <div className="icon-container">
                <Icon className="icon" />
            </div>
            <input type="file" id="fileInput" accept=".fdf" onChange={handleChange} />
        </div>
    );
}

export default AddMap;