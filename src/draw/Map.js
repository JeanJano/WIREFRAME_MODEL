import Utils from '../draw/Utils';

class Map {
  map = [];
  color = [];
  utils = new Utils();

  constructor(fileContent) {
    const lines = fileContent.split("\n");

    for (let i = 0; i < lines.length; i++) {
      let split_line = lines[i].split(/\s+/);
      this.map[i] = this.map[i] || [];
      this.color[i] = this.color[i] || [];
      this.utils.setWidth(i, 0);

      for (let j = 0; j < split_line.length; j++) {
        let split_val = split_line[j].split(",");
        this.map[i][j] = split_val[0];

        if (split_val.length === 1) {
          this.color[i][j] = '#D62828';
        } else {
          this.color[i][j] = split_val[1];
        }

        this.utils.incrWidth(i, 1);
      }
      this.utils.incrHeight(1);
    }
  }

  getPoint(x, y) {
    return (
      this.map[x][y]
    );
  }

  getColor(x, y) {
    return (
      this.color[x][y]
    );
  }

  getUtils() {
    return (
      this.utils
    );
  }

  log() {
    console.log("height");
    console.log(this.utils.getHeight());
    console.log("map: ");
    console.log(this.point);
    console.log("color: ");
    console.log(this.color);
  }
}

export default Map;