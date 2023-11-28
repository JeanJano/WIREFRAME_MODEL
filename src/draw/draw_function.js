import * as THREE from 'three';

function drawAll(myMap, scene) {
    const drawGroup = new THREE.Group();

    for (let x = 0; x < myMap.getUtils().getHeight(); x++) {
        for (let y = 0; y < myMap.getUtils().getWidth(x); y++) {
            const lineMaterial = new THREE.LineBasicMaterial({color: myMap.getColor(x, y)});
            if (y < myMap.getUtils().getWidth(x) - 1) {
                const lineGeometry = new THREE.BufferGeometry().setFromPoints([
                    new THREE.Vector3(x, y, myMap.getPoint(x, y)),
                    new THREE.Vector3(x, y + 1, myMap.getPoint(x, y + 1)),
                ]);
                const line = new THREE.Line(lineGeometry, lineMaterial);
                drawGroup.add(line);
            }
            if (x < myMap.getUtils().getHeight() - 1) {
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