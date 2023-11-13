import { height, teta, press} from './utils';
import handleKeyPress from './key';

function rotateX(x, y, z) {
    return ([
        x,
        Math.cos(teta) * y - Math.sin(teta) * z,
        Math.sin(teta) * y + Math.cos(teta) * z
    ]);
}

function rotateY(x, y, z) {
    return ([
        Math.cos(teta) * x + Math.sin(teta) * z,
        y,
        -Math.sin(teta) * x + Math.cos(teta) * z
    ]);
}

function rotateZ(x, y, z) {
    return ([
        Math.cos(teta) * x - Math.sin(teta) * y,
        Math.sin(teta) * x + Math.cos(teta) * y,
        z
    ]);
}

function rotate(x, y, z) {
    window.addEventListener('keydown', handleKeyPress);
    x -= height / 2;
    y -= height / 2;
    if (press === 1)
        return (rotateX(x, y, z));
    else if (press === 2)
        return (rotateY(x, y, z));
    else if (press === 3)
        return (rotateZ(x, y, z));
    else
        return ([x, y, z]);
}

export default rotate;