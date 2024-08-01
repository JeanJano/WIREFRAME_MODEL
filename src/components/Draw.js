import '../css/draw.css'
import React, { useRef, useEffect, useState } from 'react'
import Map from '../draw/Map';
import {drawAll} from '../draw/draw_function';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

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
];

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
              const response = await fetch(`/${input}.fdf`);
              const text = await response.text();
              setFileContent(text);
          } catch (error) {
              console.error('Error reading the file:', error);
          }
        };
        fetchData();

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(new THREE.Color("#003049"), 1);

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        let myMap;
        const initializeMap = () => {
            myMap = new Map(fileContent);
            drawAll(myMap, scene);

            const boundingBox = new THREE.Box3().setFromObject(scene);
            const center = boundingBox.getCenter(new THREE.Vector3());
            const size = boundingBox.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);

            camera.position.set(center.x, center.y, center.z + maxDim);
            controls.target.copy(center);
            const animate = () => {
                requestAnimationFrame(animate);
                controls.update();
                renderer.render(scene, camera);
            }
            animate();
        };
        initializeMap();

        return () => {
            // window.removeEventListener('keydown', handleKeyPress);
            window.removeEventListener('resize', handleResize);
            controls.dispose();
          };
    }, [fileContent, input]);

    return (
        <div className='draw'>
            <canvas ref={canvasRef} className='webgl' />
        </div>
    );
}

export default Draw;