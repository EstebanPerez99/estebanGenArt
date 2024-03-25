function setup() {
	angleMode(DEGREES);
	rectMode(CENTER);
	noLoop();

	createCanvas(700, 700);
	background(0);
}

function draw() {
	// dibujar grid
	noFill();
	stroke("#3b3b3b");
	const gridPoints = grid(10, 10, true);
	console.log(gridPoints);

	// dibujar linea
	let p1 = gridPoints[9][0];
	let p2 = gridPoints[0][9];

	stroke(255);
	strokeWeight(10);
	strokeCap(SQUARE);
	line(p1.x, p1.y, p2.x, p2.y);

	// dibujar puntos en linea
	fill("red");
	noStroke();
	const puntosLinea = generarPuntosEquidistantes(p1, p2, 100, true);
	console.log({ puntosLinea });
}
