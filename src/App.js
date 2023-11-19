import './css/App.css';
import Draw from './components/Draw';
import React, { useState } from 'react';
import NavBar from './components/NavBar'

const App = () => {
  const [selectedMap, setSelectedMap] = useState("pyramide");
  const [navBarVisible, setNavBarVisible] = useState(false);

  const handleClick = (content) => {
      setSelectedMap(content);
  };

  const handleMouseMove = (e) => {
      const windowHeight = window.innerHeight;
      const bottomThreshold = windowHeight * 0.8;

      if (e.clientY > bottomThreshold) {
          setNavBarVisible(true);
      }
      else {
          setNavBarVisible(false);
      }
  };

  return (
    <div onMouseMove={handleMouseMove} >
      <h1 className='header'>WIREFRAME</h1>
      <Draw input={selectedMap} />
      <NavBar navBarVisible={navBarVisible} handleClick={handleClick} />
    </div>
  );
}

export default App;
