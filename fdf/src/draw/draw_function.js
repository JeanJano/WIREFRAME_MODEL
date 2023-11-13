import { height, width, x_axis, y_axis, zoom} from './utils';
import rotate from './rotation.js';
function drawBackground(ctx, canvas) {
    ctx.fillStyle = "black";
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
    let vector = rotate(x, y, myMap.getPoint(x, y));

    res[0] = (Math.sqrt(2)/2) * (vector[0] - vector[1]);
    res[1] = (-Math.sqrt(2)/3) * vector[2] - ((1/Math.sqrt(6)) * -(vector[0] + vector[1]));
    
    res[0] = Math.round((res[0] + x_axis) * zoom);
    res[1] = Math.round((res[1] + y_axis) * zoom);
    return (res);
}

function drawAll(myMap, ctx) {
    let calcul1;
    let calcul2;
    for (let x = 0; x < height; x++) {
        for (let y = 0; y < width[x]; y++) {
            calcul1 = calcIso(x, y);
            ctx.strokeStyle = myMap.getColor(x, y);
            if (x < height - 1) {
                calcul2 = calcIso(x + 1, y);
                drawLine(calcul1, calcul2, ctx);
            }
            calcul2 = calcIso(x, y + 1);
            drawLine(calcul1, calcul2, ctx);
        }
    }
}

export {drawAll, drawBackground};