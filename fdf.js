const canvas = document.getElementById('pixelCanvas');
const ctx = canvas.getContext('2d');
ctx.lineWidth = 1;

let height = 0;
let width = [];
let teta = 0;
let press = 0;
let x_axis = 10;
let y_axis = 10;
let zoom = 4;

class Map {
	point = [];
	color = [];

	constructor(callback) {
		document.getElementById("fileInput").addEventListener("change", (event) => {
			const file = event.target.files[0];
			const reader = new FileReader();
			reader.onload = (event) => {
			  const contents = event.target.result;
			  const lines = contents.split("\n");
			  const output = document.getElementById("output");
			  
			  for (const line of lines) {
				let split_line = line.split(" ");
				this.point[height] = this.point[height] || [];
				this.color[height] = this.color[height] || [];
				width[height] = 0;
				for (let y = 0; y < split_line.length; y++) {
				  let split_val = split_line[y].split(",");
				  this.point[height][y] = split_val[0];
				  if (split_val.length === 1) {
					this.color[height][y] = '0x1290AF';
				  } else {
					this.color[height][y] = split_val[1];
				  }
				  width[height] += 1;
				}
				height++;
			  }
			  callback();
			};
			
			reader.readAsText(file);
		  });
	};

	getPoint(x, y) {
		return (this.point[x][y]);
	}

	getColor(x, y) {
		return (
			"#" +
			this.color[x][y].substr(2, 2) +
			this.color[x][y].substr(4, 2) +
			this.color[x][y].substr(6, 2));
	}

	log() {
		console.log(height);
		for (let i = 0; i < height - 1; i++) {
			for (let j = 0; j < width[i]; j++) {
				console.log(this.point[i][j] + " " + this.color[i][j]);
			}
		}
	}
}

function drawBackground() {
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawLine(arr1, arr2) {
	ctx.beginPath();
	ctx.moveTo(arr1[0], arr1[1]);
	ctx.lineTo(arr2[0], arr2[1]);
	ctx.stroke();
}

// import {rotateX, rotateY, rotateZ} from './test.js';

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

function rotation(x, y, z) {
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

function calcIso(x, y) {
	let res = [];
	let vector = rotation(x, y, map.getPoint(x, y));

	res[0] = (Math.sqrt(2)/2) * (vector[0] - vector[1]);
	res[1] = (-Math.sqrt(2)/3) * vector[2] - ((1/Math.sqrt(6)) * -(vector[0] + vector[1]));
	
	res[0] = Math.round((res[0] + x_axis) * zoom);
	res[1] = Math.round((res[1] + y_axis) * zoom);
	return (res);
}

function drawAll() {
	let calcul1;
	let calcul2;
	for (let x = 0; x < height; x++) {
		for (let y = 0; y < width[x]; y++) {
			calcul1 = calcIso(x, y);
			ctx.strokeStyle = map.getColor(x, y);
			if (x < height - 1) {
				calcul2 = calcIso(x + 1, y);
				drawLine(calcul1, calcul2);
			}
			calcul2 = calcIso(x, y + 1);
			drawLine(calcul1, calcul2);
		}
	}
}

const map = new Map(() => {
	// map.log();
	drawBackground();
	drawAll();
});
