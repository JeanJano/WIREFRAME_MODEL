import handleKeyPress from './key';

function rotateX(x, y, z, utils) {
    return ([
        x,
        Math.cos(utils.getTeta()) * y - Math.sin(utils.getTeta()) * z,
        Math.sin(utils.getTeta()) * y + Math.cos(utils.getTeta()) * z
    ]);
}

function rotateY(x, y, z, utils) {
    return ([
        Math.cos(utils.getTeta()) * x + Math.sin(utils.getTeta()) * z,
        y,
        -Math.sin(utils.getTeta()) * x + Math.cos(utils.getTeta()) * z
    ]);
}

function rotateZ(x, y, z, utils) {
    return ([
        Math.cos(utils.getTeta()) * x - Math.sin(utils.getTeta()) * y,
        Math.sin(utils.getTeta()) * x + Math.cos(utils.getTeta()) * y,
        z
    ]);
}

function rotate(x, y, z, utils) {
    window.addEventListener('keydown', handleKeyPress);
    x -= utils.getHeight() / 2;
    y -= utils.getHeight() / 2;
    if (utils.getPress() === 1)
        return (rotateX(x, y, z, utils));
    else if (utils.getPress() === 2)
        return (rotateY(x, y, z, utils));
    else if (utils.getPress() === 3)
        return (rotateZ(x, y, z, utils));
    else
        return ([x, y, z]);
}

export default rotate;