class Utils {
    height = 0;
    width = [];
    teta = 0;
    press = 0;
    x_axis = 10;
    y_axis = 10;
    zoom = 4;
    
    constructor() {}
    getHeight() {
        return (this.height);
    }
    incrHeight(incr) {
        this.height += incr;
    }
    getWidth(index) {
        return (this.width[index]);
    }
    setWidth(index, val) {
        this.width[index] = val;
    }
    incrWidth(index, incr) {
        this.width[index] += incr;
    }
    getTeta() {
        return (this.teta);
    }
    incrTetaPlus(incr) {
        this.teta += incr;
    }
    incrTetaLess(incr) {
        this.teta -= incr;
    }
    getPress() {
        return (this.press);
    }
    setPress(val) {
        this.press = val;
    }
    getX_axis() {
        return (this.x_axis);
    }
    incrX_axisPlus(incr) {
        this.x_axis += incr;
    }
    incrX_axisLess(incr) {
        this.x_axis -= incr;
    }
    getY_axis() {
        return (this.y_axis);
    }
    incrY_axisPlus(incr) {
        this.y_axis += incr;
    }
    incrY_axisLess(incr) {
        this.y_axis -= incr;
    }
    getZoom() {
        return (this.zoom);
    }
    incrZoomPlus(incr) {
        this.zoom += incr;
    }
    incrZoomLess(incr) {
        this.zoom -= incr;
    }
}

export default Utils;