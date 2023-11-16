import '../css/draw.css'
import React, { useRef, useEffect, useState } from 'react'
import Map from './Map';
import {drawAll, drawBackground} from './draw_function';
import Utils from './utils';
import KeyPress from './key';

const Draw = ({ input }) => {
    const canvasRef = useRef(null);
    const [fileContent, setFileContent] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
              if (input !== 'pyramide' && input !== 'pylone' && input !== 'elem2' && input !== 'flat') {
                setFileContent(input);
                return ;
              }
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
        ctx.fillStyle = 'blue';
        ctx.fillRect(10, 10, 50, 50);
        ctx.lineWidth = 1;

        let myMap;
        let utils = new Utils();
        const handleKeyPress = (event) => {
            KeyPress(event, utils, ctx, canvas, myMap);
        }
        window.addEventListener('keydown', handleKeyPress);
        const initializeMap = () => {
            myMap = new Map(fileContent, utils);
            myMap.log(utils);
            drawBackground(ctx, canvas);
            drawAll(myMap, ctx, utils);
        };
        initializeMap();
        
        return () => {
            canvas.width = 0;
            canvas.height = 0;
            window.removeEventListener('keydown', handleKeyPress);
          };
    }, [fileContent]);

    return (
        <div className='draw'>
            <canvas ref={canvasRef} />
        </div>
    );
}

export default Draw;