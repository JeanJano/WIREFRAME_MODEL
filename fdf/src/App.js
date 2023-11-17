import './css/App.css';
import Draw from './components/Draw';
import React, { useState } from 'react';
import Popup from './components/Popup'

const App = () => {
  const [selectedMap, setSelectedMap] = useState("pyramide");
  const [popupVisible, setPopupVisible] = useState(false);

  // const handleClick = (content) => {
  //     setSelectedMap(content);
  // };

  const handleMouseMove = (e) => {
      const windowHeight = window.innerHeight;
      const bottomThreshold = windowHeight * 0.9;

      if (e.clientY > bottomThreshold) {
          setPopupVisible(true);
      }
      else {
          setPopupVisible(false);
      }
  };

  return (
    <div onMouseMove={handleMouseMove} >
      <h1 className='header'>WIREFRAME</h1>
      <Draw input={selectedMap} />
      <Popup popupVisible={popupVisible} />
    </div>
  );
}

export default App;
