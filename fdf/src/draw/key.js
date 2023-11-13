import { press, teta, zoom, x_axis, y_axis} from './utils';
import { drawAll, drawBackground } from './draw_function';

function handleKeyPress(event) {
    // rotation: q w e 
    if (event.keyCode === 81 || event.keyCode === 87 || event.keyCode === 69 || event.keyCode === 65 || event.keyCode === 83 || event.keyCode === 68) {
        if (event.keyCode === 81 || event.keyCode === 65)
            press = 1;
        else if (event.keyCode === 87 || event.keyCode === 83)
            press = 2;
        else
            press = 3;
        if (event.keyCode === 81 || event.keyCode === 87 || event.keyCode === 69)
            teta += 0.1;
        else
            teta -= 0.1;
    }
    // zoom: + -
    if (event.keyCode === 189 || event.keyCode === 187) {
        if (event.keyCode === 189)
            zoom--;
        else
            zoom++;
        press = 5;
    }
    // moove: arrow
    if (event.keyCode === 37 || event.keyCode === 39) {
        if (event.keyCode === 37)
            x_axis -= 2;
        else
            x_axis += 2;
    }
    if (event.keyCode === 38 || event.keyCode === 40) {
        if (event.keyCode === 38)
            y_axis -= 2;
        else
            y_axis += 2;
    }
    drawBackground();
    drawAll();
}

export default handleKeyPress;