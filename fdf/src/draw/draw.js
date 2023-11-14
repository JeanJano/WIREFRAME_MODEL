import '../css/draw.css'
import React, { useRef, useEffect, useState } from 'react'
import Map from './Map';
import {drawAll, drawBackground} from './draw_function';
import Utils from './utils';

const Draw = ({ input }) => {
    const canvasRef = useRef(null);
    const [fileContent, setFileContent] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
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
        ctx.fillStyle = 'blue';
        ctx.fillRect(10, 10, 50, 50);
        ctx.lineWidth = 1;

        let myMap;
        let utils = new Utils();
        const initializeMap = () => {
            myMap = new Map(fileContent, utils);
            // console.log(fileContent);
            myMap.log(utils);
            drawBackground(ctx, canvas);
            drawAll(myMap, ctx, utils);
        };
        initializeMap();

    }, [fileContent]);

    return (
        <div className='draw'>
            <h1 className='write'>WIREFRAME</h1>
            <canvas ref={canvasRef} width={300} height={300} />
        </div>
    );
}

export default Draw;