function rotateX(x, y, z, myMap) {
    return ([
        x,
        Math.cos(myMap.getUtils().getTeta()) * y - Math.sin(myMap.getUtils().getTeta()) * z,
        Math.sin(myMap.getUtils().getTeta()) * y + Math.cos(myMap.getUtils().getTeta()) * z
    ]);
}

function rotateY(x, y, z, myMap) {
    return ([
        Math.cos(myMap.getUtils().getTeta()) * x + Math.sin(myMap.getUtils().getTeta()) * z,
        y,
        -Math.sin(myMap.getUtils().getTeta()) * x + Math.cos(myMap.getUtils().getTeta()) * z
    ]);
}

function rotateZ(x, y, z, myMap) {
    return ([
        Math.cos(myMap.getUtils().getTeta()) * x - Math.sin(myMap.getUtils().getTeta()) * y,
        Math.sin(myMap.getUtils().getTeta()) * x + Math.cos(myMap.getUtils().getTeta()) * y,
        z
    ]);
}

function rotate(x, y, z, myMap) {
    x -= myMap.getUtils().getHeight() / 2;
    y -= myMap.getUtils().getHeight() / 2;
    if (myMap.getUtils().getPress() === 1)
        return (rotateX(x, y, z, myMap));
    else if (myMap.getUtils().getPress() === 2)
        return (rotateY(x, y, z, myMap));
    else if (myMap.getUtils().getPress() === 3)
        return (rotateZ(x, y, z, myMap));
    else
        return ([x, y, z]);
}

export default rotate;