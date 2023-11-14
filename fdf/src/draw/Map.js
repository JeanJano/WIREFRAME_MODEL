class Map {
  point = [];
  color = [];

  constructor(fileContent, utils) {
    const lines = fileContent.split("\n");

    for (const line of lines) {
      let split_line = line.split(" ");
      this.point[utils.getHeight()] = this.point[utils.getHeight()] || [];
      this.color[utils.getHeight()] = this.color[utils.getHeight()] || [];
      utils.setWidth(utils.getHeight(), 0);

      for (let y = 0; y < split_line.length; y++) {
        let split_val = split_line[y].split(",");
        this.point[this.point.length - 1][y] = split_val[0];

        if (split_val.length === 1) {
          this.color[this.color.length - 1][y] = '0x1290AF';
        } else {
          this.color[this.color.length - 1][y] = split_val[1];
        }

        utils.incrWidth(this.point.length - 1, 1);
      }
      utils.incrHeight(1);
    }
  }

  getPoint(x, y) {
    return this.point[x][y];
  }

  getColor(x, y) {
    return (
      "#" +
      this.color[x][y].substr(2, 2) +
      this.color[x][y].substr(4, 2) +
      this.color[x][y].substr(6, 2)
    );
  }

  log(utils) {
    console.log(utils.getHeight());
    for (let i = 0; i < this.point.length; i++) {
      for (let j = 0; j < utils.getWidth(i); j++) {
        console.log(this.point[i][j] + " " + this.color[i][j]);
      }
    }
  }
}

export default Map;