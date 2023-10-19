const canvas = document.getElementById('pixelCanvas');

const ctx = canvas.getContext('2d');

ctx.strokeStyle = 'red';
ctx.lineWidth = 1;

const height = 10;
const width = 10;
let teta = 0;
let press = 0;
let x_axis = 0;
let y_axis = 0;
let zoom = 20;

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
				// console.log(line);
				output.textContent += line + "\n";
				let split_line = line.split(" ");
				
				this.point[x_axis] = this.point[x_axis] || [];
				this.color[x_axis] = this.color[x_axis] || [];
				
				for (let y = 0; y < split_line.length; y++) {
				  let split_val = split_line[y].split(",");
				//   console.log(split_val[0]);
				  this.point[x_axis][y] = split_val[0];
				  if (split_val.length === 1) {
					this.color[x_axis][y] = '0x0000FF';
				  } else {
					this.color[x_axis][y] = split_val[1];
				  }
				}
				
				if (x_axis === 0) {
				  y_axis = split_line.length;
				}
				
				x_axis++;
			  }
			  
			  // Trim the arrays to the actual size
			  this.point.length = x_axis;
			  this.color.length = x_axis;
			  this.point.forEach(row => {
				row.length = y_axis;
			  });
			  this.color.forEach(row => {
				row.length = y_axis;
			  });
			  callback();
			};
			
			reader.readAsText(file);
		  });
	};

	getPoint() {
		return (this.point);
	}

	getColor() {
		return (this.color);
	}

	log() {
		console.log(x_axis);
		for (let i = 0; i < x_axis; i++) {
			for (let j = 0; j < y_axis; j++) {
				console.log(this.point[i][j] + " " + this.color[i][j]);
			}
		}
	}
}

// let array = [
// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// 	[0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
// 	[0, 1, 2, 2, 2, 2, 2, 2, 1, 0],
// 	[0, 1, 2, 3, 3, 3, 3, 2, 1, 0],
// 	[0, 1, 2, 3, 0, 0, 3, 2, 1, 0],
// 	[0, 1, 2, 3, 0, 0, 3, 2, 1, 0],
// 	[0, 1, 2, 3, 3, 3, 3, 2, 1, 0],
// 	[0, 1, 2, 2, 2, 2, 2, 2, 1, 0],
// 	[0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// ];

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
		drawBackground();
		drawAll();
    }
	// zoom: + -
	if (event.keyCode === 189 || event.keyCode === 187) {
		if (event.keyCode === 189)
			zoom--;
		else
			zoom++;
		press = 5;
		drawBackground();
		drawAll();
	}
	// moove: arrow
	if (event.keyCode === 37 || event.keyCode === 39) {
		if (event.keyCode === 37)
			x_axis -= 2;
		else
			x_axis += 2;
		drawBackground();
		drawAll();
	}
	if (event.keyCode === 38 || event.keyCode === 40) {
		if (event.keyCode === 38)
			y_axis -= 2;
		else
			y_axis += 2;
		drawBackground();
		drawAll();
	}
}

function rotation(x, y, z) {
	window.addEventListener('keydown', handleKeyPress);
	x -= height / 2;
	y -= width / 2;
	if (press === 1)
		return (rotateX(x, y, z));
	else if (press === 2)
		return (rotateY(x, y, z));
	else if (press === 3)
		return (rotateZ(x, y, z));
	else
		return ([x, y, z]);
}

function calcIso(x, y, map) {
	let res = [];
	let point = map.getPoint();
	let vector = rotation(x, y, point[x][y]);

	res[0] = (Math.sqrt(2)/2) * (vector[0] - vector[1]);
	res[1] = (-Math.sqrt(2)/3) * vector[2] - ((1/Math.sqrt(6)) * -(vector[0] + vector[1]));
	
	res[0] = Math.round((res[0] + x_axis) * zoom);
	res[1] = Math.round((res[1] + y_axis) * zoom);
	return (res);
}

function drawAll(map) {
	let transform1;
	let transform2;
	for (let i = 0; i < x_axis; i++) {
		for (let j = 0; j < y_axis; j++) {
			transform1 = calcIso(i, j, map);
			if (i < x_axis - 1) {
				transform2 = calcIso(i + 1, j, map);
				drawLine(transform1, transform2);
			}
			transform2 = calcIso(i, j + 1, map);
			drawLine(transform1, transform2);
		}
	}
}

const map = new Map(() => {
	// map.log();
	drawBackground();
	drawAll(map);
});
