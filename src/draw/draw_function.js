import rotate from './rotation.js';

function drawBackground(ctx, canvas) {
    ctx.fillStyle = "#003049";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawLine(arr1, arr2, ctx) {
    ctx.beginPath();
    ctx.moveTo(arr1[0], arr1[1]);
    ctx.lineTo(arr2[0], arr2[1]);
    ctx.stroke();
}

function calcIso(x, y, myMap) {
    let res = [];
    let vector = rotate(x, y, myMap.getPoint(x, y), myMap);

    res[0] = (Math.sqrt(2)/2) * (vector[0] - vector[1]);
    res[1] = (Math.sqrt(2)/3) * vector[2] - ((1/Math.sqrt(6)) * -(vector[0] + vector[1]));

    res[0] = Math.round((res[0] + myMap.getUtils().getX_axis()) * myMap.getUtils().getZoom());
    res[1] = Math.round((res[1] + myMap.getUtils().getY_axis()) * myMap.getUtils().getZoom());
    return (res);
}

function drawAll(myMap, ctx) {
    let calcul1, calcul2;

    for (let x = 0; x < myMap.getUtils().getHeight(); x++) {
        for (let y = 0; y < myMap.getUtils().getWidth(x); y++) {
            calcul1 = calcIso(x, y, myMap);
            ctx.strokeStyle = myMap.getColor(x, y);
            if (y < myMap.getUtils().getWidth(x) - 1) {
                calcul2 = calcIso(x, y + 1, myMap);
                drawLine(calcul1, calcul2, ctx);
            }
            if (x < myMap.getUtils().getHeight() - 1) {
                calcul2 = calcIso(x + 1, y, myMap);
                drawLine(calcul1, calcul2, ctx);
            }
        }
    }
}

export {drawAll, drawBackground};