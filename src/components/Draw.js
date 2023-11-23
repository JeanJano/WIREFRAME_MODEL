import '../css/draw.css'
import React, { useRef, useEffect, useState } from 'react'
import Map from '../draw/Map';
import {drawAll, drawBackground} from '../draw/draw_function';
import KeyPress from '../draw/key';

const nameFile = [
    "pyramide",
    "pylone",
    "elem2",
    "flat",
    "10-2",
    "10-70",
    "20-60",
    "50-4",
    "elem-col",
    "mars",
    "t2"
]

const Draw = ({ input }) => {
    const canvasRef = useRef(null);
    const [fileContent, setFileContent] = useState('');

    useEffect(() => {
      const fetchData = async () => {
          try {
              if (!nameFile.includes(input)) {
                setFileContent(input);
                return ;
              }
              console.log(input);
              const response = await fetch(`/${input}.fdf`);
              const text = await response.text();
              setFileContent(text);
          } catch (error) {
              console.error('Error reading the file:', error);
          }
        };
        fetchData();

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
        ctx.lineWidth = 1;

        let myMap;
        const handleKeyPress = (event) => {
            KeyPress(event, ctx, canvas, myMap);
        }
        window.addEventListener('keydown', handleKeyPress);
        const initializeMap = () => {
            myMap = new Map(fileContent);
            // myMap.log();
            drawBackground(ctx, canvas);
            drawAll(myMap, ctx);
        };
        initializeMap();
        
        return () => {
            canvas.width = 0;
            canvas.height = 0;
            window.removeEventListener('keydown', handleKeyPress);
          };
    }, [fileContent, input]);

    return (
        <div className='draw'>
            <canvas ref={canvasRef} />
        </div>
    );
}

export default Draw;