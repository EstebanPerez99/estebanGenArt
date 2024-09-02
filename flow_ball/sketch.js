const NOISE_SIZE = 0.001; // esto ordena o desordena los hilos, entre mas chico mas random - 0.001
const NOISE_RADIUS = 0.002; //  esto hace los hilos mas grandes o mas chicos, entre mas chico mas largos - 0.002

function setup() {
	createCanvas(500, 500);
	noLoop();
	strokeWeight(3);
	colorMode(HSL);
}
function draw() {
	background("#222");
	u_flowBall_drawBall(100, 100, 200, {
		noise_size: NOISE_SIZE,
		noise_radius: NOISE_RADIUS,
		getColor,
	});
	u_flowBall_drawBall(250, 250, 200, {
		noise_size: NOISE_SIZE,
		noise_radius: NOISE_RADIUS,
		getColor,
	});
	u_flowBall_drawBall(350, 430, 200, {
		noise_size: NOISE_SIZE,
		noise_radius: NOISE_RADIUS,
		getColor,
	});
}

keyPressed = function () {
	if (keyCode === 80) {
		saveCanvas("noise_grid", "jpeg");
	}
};

// pelota toda amarilla
function getColor() {
	let h = random(50, 60); // Aproximadamente el tono del amarillo
	let s = random(80, 100);
	let l = random(45, 60);
	return color(h, s, l);
}
