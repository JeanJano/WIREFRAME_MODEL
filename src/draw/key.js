import { drawAll } from './draw_function';

function KeyPress(event, canvas, myMap) {
    // rotation: q w e 
    if (event.keyCode === 81 || event.keyCode === 87 || event.keyCode === 69 || event.keyCode === 65 || event.keyCode === 83 || event.keyCode === 68) {
        if (event.keyCode === 81 || event.keyCode === 65)
            myMap.getUtils().setPress(1);
        else if (event.keyCode === 87 || event.keyCode === 83)
            myMap.getUtils().setPress(2);
        else
            myMap.getUtils().setPress(3);
        if (event.keyCode === 81 || event.keyCode === 87 || event.keyCode === 69)
            myMap.getUtils().incrTetaPlus(0.1);
        else
            myMap.getUtils().incrTetaLess(0.1);
    }
    // zoom: + -
    if (event.keyCode === 189 || event.keyCode === 187) {
        if (event.keyCode === 189)
            myMap.getUtils().incrZoomLess(1);
        else
            myMap.getUtils().incrZoomPlus(1);
        myMap.getUtils().setPress(5);
    }
    // moove: arrow
    if (event.keyCode === 37 || event.keyCode === 39) {
        if (event.keyCode === 37)
            myMap.getUtils().incrX_axisLess(2);
        else
            myMap.getUtils().incrX_axisPlus(2);
    }
    if (event.keyCode === 38 || event.keyCode === 40) {
        if (event.keyCode === 38)
            myMap.getUtils().incrY_axisLess(2);
        else
            myMap.getUtils().incrY_axisPlus(2);
    }
    // drawBackground(ctx, canvas);
    drawAll(myMap);
}

export default KeyPress;