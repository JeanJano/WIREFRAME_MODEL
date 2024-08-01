import * as THREE from 'three';

const uniforms = {
    uMouse: { value: new THREE.Vector2() },
}

window.addEventListener('mousemove', (event) => {
    uniforms.uMouse.value.x = (event.clientX / window.innerWidth) * 2 - 1;
    uniforms.uMouse.value.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

function drawAll(myMap, scene) {
    const drawGroup = new THREE.Group();

    for (let x = 0; x < myMap.getUtils().getHeight(); x++) {
        for (let y = 0; y < myMap.getUtils().getWidth(x); y++) {
            const lineMaterial = new THREE.LineBasicMaterial({color: myMap.getColor(x, y)});
            lineMaterial.onBeforeCompile = shader => {
                shader.uniforms.uMouse = uniforms.uMouse;
                shader.vertexShader = `
                    uniform vec2 uMouse;
                    uniform float uTime;
                    varying vec3 vPosition;
                    ${shader.vertexShader}
                `.replace(
                    `#include <begin_vertex>`,
                    `
                        vec3 transformed = vec3(position);
                        vec4 mvPosition1 = modelViewMatrix * vec4(transformed, 1.0);
                        vec4 projectedPosition = projectionMatrix * mvPosition1;
                        vec2 ndcPosition = projectedPosition.xy / projectedPosition.w;
                        float dist = distance(ndcPosition, uMouse);
                        if (dist < 0.25) {
                            float deform = exp(-dist * 10.0) * 1.5; // Adjust the deformation strength
                            transformed.z += deform;
                            transformed.x += deform * 0.2; // Adjust the deformation direction
                        }
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
                        vPosition = transformed;
                    `
                );
            };
            if (y < myMap.getUtils().getWidth(x) - 1) {
                const lineGeometry = new THREE.BufferGeometry().setFromPoints([
                    new THREE.Vector3(x, y, myMap.getPoint(x, y)),
                    new THREE.Vector3(x, y + 1, myMap.getPoint(x, y + 1)),
                ]);
                const line = new THREE.Line(lineGeometry, lineMaterial);
                drawGroup.add(line);
            }
            if (x < myMap.getUtils().getHeight() - 2) {
                const lineGeometry = new THREE.BufferGeometry().setFromPoints([
                    new THREE.Vector3(x, y, myMap.getPoint(x, y)),
                    new THREE.Vector3(x + 1, y, myMap.getPoint(x + 1, y)),
                ]);
                const line = new THREE.Line(lineGeometry, lineMaterial);
                drawGroup.add(line);
            }
        }
    }
    scene.add(drawGroup);
}

export {drawAll};