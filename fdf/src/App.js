import './css/App.css';
import InputButton from './components/InputButton';
import GridButton from './components/GridButton';
import Draw from './draw/draw';
import React, { useState } from 'react';

const App = () => {
  const [redirectToDrawPage, setRedirectToDrawPage] = useState(false);
  const [selectedMap, setSelectedMap] = useState(null);

  const handleClick = (content) => {
      setSelectedMap(content);
      setRedirectToDrawPage(true);
  };

  const handleFileChange = (content) => {
    setSelectedMap(content);
    setRedirectToDrawPage(true);
  }

  return (
    <div>
      {
        redirectToDrawPage ? (
          <Draw input={selectedMap}/>
        ) : (
          <div>
            <h1 className="header">WIREFRAME</h1>
            <InputButton handleFileChange={handleFileChange} />
            <GridButton handleClick={handleClick} />
          </div>
        )}
    </div>
  );
}

export default App;
