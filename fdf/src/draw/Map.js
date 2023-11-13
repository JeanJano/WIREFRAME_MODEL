import { height, width} from './utils';

class Map {
    point = [];
    color = [];
  
    constructor(fileContent, callback) {
      const lines = fileContent.split("\n");
  
      for (const line of lines) {
        let split_line = line.split(" ");
        this.point[height] = this.point[height] || [];
        this.color[height] = this.color[height] || [];
        width[height] = 0;
  
        for (let y = 0; y < split_line.length; y++) {
          let split_val = split_line[y].split(",");
          this.point[this.point.length - 1][y] = split_val[0];
  
          if (split_val.length === 1) {
            this.color[this.color.length - 1][y] = '0x1290AF';
          } else {
            this.color[this.color.length - 1][y] = split_val[1];
          }
  
          width[this.point.length - 1] += 1;
        }
      }
  
      callback();
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
  
    log() {
      console.log(height);
      for (let i = 0; i < this.point.length; i++) {
        for (let j = 0; j < width[i]; j++) {
          console.log(this.point[i][j] + " " + this.color[i][j]);
        }
      }
    }
  }
  
  export default Map;