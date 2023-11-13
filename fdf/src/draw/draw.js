import '../css/draw.css'
import React, { useRef, useEffect, useState } from 'react'
import Map from './Map';
import { height, teta, press, x_axis, y_axis, zoom, ctx } from './utils';
import {drawAll, drawBackground} from './draw_function';

const Draw = (input) => {
    console.log(input);
    const canvasRef = useRef(null);
    const [fileContent, setFileContent] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await fetch('../pyramide.fdf'); // Specify the path to your text file
              const text = await response.text();
              setFileContent(text);
            } catch (error) {
              console.error('Error reading the file:', error);
            }
        };
        fetchData();

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = 'blue';
        ctx.fillRect(10, 10, 50, 50);
        ctx.lineWidth = 1;

        const myMap = new Map(fileContent, () => {
            // myMap.log();
            drawBackground(ctx, canvas);
            drawAll(myMap, ctx);
        });
    }, []);
    
    return (
        <div className='draw'>
            <h1 className='write'>WIREFRAME</h1>
            <canvas ref={canvasRef} width={300} height={300} />
        </div>
    );
}

export default Draw;