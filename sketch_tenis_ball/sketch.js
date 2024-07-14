let INCLINATION = 0;
let CONFIGS = { originX: 0, originY: 0 };
function setup() {
	randomSeed(1);
	const canvasSize = round(random(500, 1000));
	createCanvas(canvasSize, canvasSize);
	rectMode(CENTER);
	angleMode(DEGREES);
	noLoop();
}

function draw() {
	background(220);

	fill(255, 0, 0);
	textSize(20);
	textAlign(LEFT, TOP);
	text(INCLINATION, 10, 10);

	push();

	const middle = width / 2;

	noStroke();
	fill(244, 226, 49);
	const ballDiameter = width * 0.98;
	circle(middle, middle, ballDiameter);
	noFill();
	stroke(255, 0, 0);
	circle(middle, middle, 5);

	const mouseXWithLimit = min(width, mouseX);
	const mouseYHeightLimit = min(height, mouseY);
	const PADDING = width * 0; // 0.2;
	const xPointer = map(mouseXWithLimit, 0, width, PADDING, width - PADDING);
	const yPointer = map(mouseYHeightLimit, 0, height, PADDING, height - PADDING);
	translate(xPointer, yPointer);
	CONFIGS = { originX: xPointer, originY: yPointer };
	const DISTANCIA_ENTRE_FIGURAS = width + width * 0.1; // 0.9

	let rectPosX = -DISTANCIA_ENTRE_FIGURAS / 2;
	let rectPosY = 0;
	let rectWidth = width * 0.5;
	let rectHeigth = height * 0.3; // 0.8
	let circleCenterX = rectWidth / 2 + rectPosX;

	push();
	noStroke();
	fill(0, 0, 255);
	circle(0, 0, 5);
	pop();

	const inner_offset = width * 0.025;
	const inner_offset_half = inner_offset / 2;

	push(); // (start) ESQUELETO  **********
	rotate(INCLINATION);
	stroke(255, 0, 0);
	strokeWeight(1);
	rect(rectPosX, rectPosY, rectWidth, rectHeigth);
	rect(rectPosX, rectPosY, rectWidth, rectHeigth - inner_offset);
	circle(circleCenterX, rectPosY, rectHeigth);
	circle(circleCenterX, rectPosY, rectHeigth - inner_offset);

	const curve_offset = width * 0.175;
	const curve_offset2 = width * 0.181;

	// circulo de arriba
	circle(
		circleCenterX - curve_offset,
		rectPosY - rectHeigth + inner_offset_half,
		rectHeigth
	);
	circle(
		circleCenterX - curve_offset2,
		rectPosY - rectHeigth + inner_offset_half,
		rectHeigth - inner_offset
	);
	// circulo de abajo
	circle(
		circleCenterX - curve_offset,
		rectPosY + rectHeigth - inner_offset_half,
		rectHeigth
	);
	circle(
		circleCenterX - curve_offset2,
		rectPosY + rectHeigth - inner_offset_half,
		rectHeigth - inner_offset
	);

	doFloodFill(createVector(circleCenterX + 3, -rectHeigth / 2 + 3));
	// doFloodFill(createVector(circleCenterX - 3, -rectHeigth / 2 + 3));
	// doFloodFill(createVector(circleCenterX - curve_offset, -rectHeigth / 2 + 3));
	// const puntosEq1 = generarPuntosEquidistantes(
	// 	{ x: circleCenterX - 3, y: -rectHeigth / 2 + 3 },
	// 	{ x: circleCenterX - curve_offset, y: -rectHeigth / 2 + 3 },
	// 	10,
	// 	false
	// );
	// puntosEq1.forEach((p) => {
	// 	doFloodFill(p);
	// });

	// doFloodFill(createVector(circleCenterX - 3, rectHeigth / 2 - 3));
	// doFloodFill(createVector(circleCenterX - curve_offset, rectHeigth / 2 - 3));
	// const puntosEq2 = generarPuntosEquidistantes(
	// 	{ x: circleCenterX - 3, y: rectHeigth / 2 - 3 },
	// 	{ x: circleCenterX - curve_offset, y: rectHeigth / 2 - 3 },
	// 	10,
	// 	false
	// );
	// puntosEq2.forEach((p) => {
	// 	doFloodFill(p);
	// });

	// doFloodFill(
	// 	createVector(
	// 		circleCenterX - curve_offset - rectHeigth / 2 + 2,
	// 		rectPosY - rectHeigth + inner_offset_half + 3
	// 	)
	// );
	// doFloodFill(
	// 	createVector(
	// 		circleCenterX - curve_offset - rectHeigth / 2 + 2,
	// 		rectPosY + rectHeigth - inner_offset_half - 3
	// 	)
	// );

	// -------- MIRRROR --------

	rectPosX = DISTANCIA_ENTRE_FIGURAS / 2;
	// rectWidth = width / 2;
	circleCenterX = rectPosX - rectWidth / 2;

	rect(rectPosX, rectPosY, rectWidth, rectHeigth);
	circle(circleCenterX, rectPosY, rectHeigth);
	rect(rectPosX, rectPosY, rectWidth, rectHeigth - inner_offset);
	circle(circleCenterX, rectPosY, rectHeigth - inner_offset);

	// circulo de arriba
	circle(
		circleCenterX + curve_offset,
		rectPosY - rectHeigth + inner_offset_half,
		rectHeigth
	);
	circle(
		circleCenterX + curve_offset2,
		rectPosY - rectHeigth + inner_offset_half,
		rectHeigth - inner_offset
	);
	// circulo de abajo
	circle(
		circleCenterX + curve_offset,
		rectPosY + rectHeigth - inner_offset_half,
		rectHeigth
	);
	circle(
		circleCenterX + curve_offset2,
		rectPosY + rectHeigth - inner_offset_half,
		rectHeigth - inner_offset
	);

	// doFloodFill(createVector(circleCenterX - 5, -rectHeigth / 2 + 3));
	// doFloodFill(createVector(circleCenterX + 3, -rectHeigth / 2 + 3));
	// doFloodFill(createVector(circleCenterX + curve_offset, -rectHeigth / 2 + 3));
	// const puntosEq3 = generarPuntosEquidistantes(
	// 	{ x: circleCenterX + 3, y: -rectHeigth / 2 + 3 },
	// 	{ x: circleCenterX + curve_offset, y: -rectHeigth / 2 + 3 },
	// 	10,
	// 	false
	// );
	// puntosEq3.forEach((p) => {
	// 	doFloodFill(p);
	// });

	// doFloodFill(createVector(circleCenterX + 3, rectHeigth / 2 - 3));
	// doFloodFill(createVector(circleCenterX + curve_offset, rectHeigth / 2 - 3));
	// const puntosEq4 = generarPuntosEquidistantes(
	// 	{ x: circleCenterX + 3, y: rectHeigth / 2 - 3 },
	// 	{ x: circleCenterX + curve_offset, y: rectHeigth / 2 - 3 },
	// 	10,
	// 	false
	// );
	// puntosEq4.forEach((p) => {
	// 	doFloodFill(p);
	// });
	// doFloodFill(
	// 	createVector(
	// 		circleCenterX + curve_offset + rectHeigth / 2 - 2,
	// 		rectPosY - rectHeigth + inner_offset_half + 3
	// 	)
	// );
	doFloodFill(
		createVector(
			circleCenterX + curve_offset + rectHeigth / 2 - 2,
			rectPosY + rectHeigth - inner_offset_half - 3
		)
	);
	pop(); // (end) ESQUELETO **********
	pop();
}

function keyTyped() {
	if (key === "S") {
		saveCanvas("ball_" + random(1, 100000), "jpeg");
	}
}

function keyPressed() {
	if (keyCode === UP_ARROW) {
		INCLINATION += 10;
	} else if (keyCode === DOWN_ARROW) {
		INCLINATION -= 10;
	}
	if (INCLINATION < 0) {
		INCLINATION = 360;
	}
	if (INCLINATION > 360) {
		INCLINATION = 0;
	}
}

// function doFloodFill(seed) {
// 	seed = createVector(round(seed.x), round(seed.y));
// 	print(seed.x, seed.y);
// 	push();
// 	noStroke();
// 	fill(0);
// 	circle(seed.x, seed.y, 2);
// 	pop();
// }

function doFloodFill(seed, fillColor = [255, 255, 255]) {
	push();
	translate(-CONFIGS.originX, -CONFIGS.originY);
	seed = createVector(
		round(seed.x + CONFIGS.originX),
		round(seed.y + CONFIGS.originY)
	);
	if (seed.x > width || seed.x < 0 || seed.y > height || seed.y < 0) {
		pop();
		return;
	}
	loadPixels();

	let index = 4 * (width * seed.y + seed.x);
	// print("seed.x: ", seed.x);
	// print("seed.y: ", seed.y);
	let seedColor = [pixels[index], pixels[index + 1], pixels[index + 2]];

	// solo se pinta si el seed color es diferente al fill color y si el seed color es amarillo.
	if (u_arrayEquals(seedColor, fillColor)) {
		pop();
		return;
	}

	let queue = [];
	queue.push(seed);

	while (queue.length) {
		let current = queue.shift();
		index = 4 * (width * current.y + current.x);
		let color = [pixels[index], pixels[index + 1], pixels[index + 2]];

		// solo se pinta si el color es igual al seed color (aka amarillo)
		if (
			!u_arrayEquals(color, seedColor) &&
			!u_arrayEquals(color, [244, 226, 49]) // esto en teoria deberia funcionar, pero hay colores intermedios que hacen que no jale D:
		) {
			// logear para ver en que color se para
			// console.log("color: ", color);
			continue;
		}

		for (let i = 0; i < 4; i++) {
			if (i === 3) {
				pixels[index + i] = 255;
			}
			pixels[index + i] = fillColor[0 + i];
		}

		queue = u_expandToNeighbors(queue, current);
	}

	pop();
	updatePixels();
}
