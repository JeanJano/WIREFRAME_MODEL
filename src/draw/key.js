import { drawAll, drawBackground } from './draw_function';

function KeyPress(event, utils, ctx, canvas, myMap) {
    // rotation: q w e 
    if (event.keyCode === 81 || event.keyCode === 87 || event.keyCode === 69 || event.keyCode === 65 || event.keyCode === 83 || event.keyCode === 68) {
        if (event.keyCode === 81 || event.keyCode === 65)
            utils.setPress(1);
        else if (event.keyCode === 87 || event.keyCode === 83)
            utils.setPress(2);
        else
            utils.setPress(3);
        if (event.keyCode === 81 || event.keyCode === 87 || event.keyCode === 69)
            utils.incrTetaPlus(0.1);
        else
            utils.incrTetaLess(0.1);
    }
    // zoom: + -
    if (event.keyCode === 189 || event.keyCode === 187) {
        if (event.keyCode === 189)
            utils.incrZoomLess(1);
        else
            utils.incrZoomPlus(1);
        utils.setPress(5);
    }
    // moove: arrow
    if (event.keyCode === 37 || event.keyCode === 39) {
        if (event.keyCode === 37)
            utils.incrX_axisLess(2);
        else
            utils.incrX_axisPlus(2);
    }
    if (event.keyCode === 38 || event.keyCode === 40) {
        if (event.keyCode === 38)
            utils.incrY_axisLess(2);
        else
            utils.incrY_axisPlus(2);
    }
    drawBackground(ctx, canvas);
    drawAll(myMap, ctx, utils);
}

export default KeyPress;