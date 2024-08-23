let INCLINATION = 0;
let CONFIGS = { originX: 0, originY: 0 };
function setup() {
	randomSeed(1);
	const canvasSize = round(random(500, 1000));
	createCanvas(canvasSize, canvasSize);
	rectMode(CENTER);
	angleMode(DEGREES);
	colorMode(HSL);
	// pixelDensity(1);
	print("pixelDensity: ", pixelDensity());
	CONFIGS.pixelDensity = pixelDensity();
	// noLoop();
}

function draw() {
	background(0, 0, 86);

	fill(0, 100, 50);
	textSize(20);
	textAlign(LEFT, TOP);
	text(INCLINATION, 10, 10);

	push();

	const middle = width / 2;

	noStroke();
	fill(55, 90, 57); // amarillo
	const ballDiameter = width * 0.98;
	circle(middle, middle, ballDiameter);
	noFill();
	stroke(0, 100, 50);
	circle(middle, middle, 5);

	const mouseXWithLimit = 67;
	const mouseYHeightLimit = 306;
	// const mouseXWithLimit = min(width, mouseX);
	// const mouseYHeightLimit = min(height, mouseY);
	const PADDING = width * 0; // 0.2;
	const xPointer = map(mouseXWithLimit, 0, width, PADDING, width - PADDING);
	const yPointer = map(mouseYHeightLimit, 0, height, PADDING, height - PADDING);
	translate(xPointer, yPointer);
	CONFIGS = { originX: xPointer, originY: yPointer };
	const DISTANCIA_ENTRE_FIGURAS = width + width * 0.2; // 0.9

	let rectPosX = -DISTANCIA_ENTRE_FIGURAS / 2;
	let rectPosY = 0;
	let rectWidth = width * 0.5;
	let rectHeight = height * 0.3; // 0.8
	let circleCenterX = rectWidth / 2 + rectPosX;

	push();
	noStroke();
	fill(240, 100, 50);
	circle(0, 0, 5);
	pop();

	const inner_offset = width * 0.025;
	const inner_offset_half = inner_offset / 2;

	push(); // (start) ESQUELETO  **********
	rotate(INCLINATION);
	stroke(0, 100, 50);
	strokeWeight(1);

	const rect_centro_1 = {
		rx: rectPosX,
		ry: rectPosY,
		width: rectWidth,
		height: rectHeight,
	};
	const rect_interior_centro_1 = {
		rx: rectPosX,
		ry: rectPosY,
		width: rectWidth,
		height: rectHeight - inner_offset,
	};
	const circulo_centro_1 = {
		cx: circleCenterX,
		cy: rectPosY,
		diameter: rectHeight,
	};
	const circulo_interior_centro_1 = {
		cx: circleCenterX,
		cy: rectPosY,
		diameter: rectHeight - inner_offset,
	};

	const curve_offset = width * 0.175;
	const curve_offset2 = width * 0.181;

	// circulo de arriba
	const circulo_arriba_1 = {
		cx: circleCenterX - curve_offset,
		cy: rectPosY - rectHeight + inner_offset_half,
		diameter: rectHeight,
	};
	const circulo_interior_arriba_1 = {
		cx: circleCenterX - curve_offset2,
		cy: rectPosY - rectHeight + inner_offset_half,
		diameter: rectHeight - inner_offset,
	};
	// circulo de abajo
	const circulo_abajo_1 = {
		cx: circleCenterX - curve_offset,
		cy: rectPosY + rectHeight - inner_offset_half,
		diameter: rectHeight,
	};
	const circulo_interior_abajo_1 = {
		cx: circleCenterX - curve_offset2,
		cy: rectPosY + rectHeight - inner_offset_half,
		diameter: rectHeight - inner_offset,
	};

	/**
	 * Cajas de colisión (start)
	 */
	push();
	const rectColl_circuloArriba_1 = {
		rx: circleCenterX - curve_offset - rectHeight / 2,
		ry: rectPosY - rectHeight + inner_offset_half - rectHeight / 2,
		width: rectHeight / 2,
		height: rectHeight,
	};
	const rectColl_rectCentro_1 = {
		rx: circleCenterX - curve_offset + 1,
		ry: rectPosY - rectHeight / 2,
		width: abs(circleCenterX - curve_offset + 1 - circleCenterX),
		height: rectHeight,
	};
	const rectColl_circuloCentro_1 = {
		rx: circleCenterX + 1,
		ry: rectPosY - rectHeight / 2,
		width: rectHeight / 2,
		height: rectHeight,
	};
	const rectColl_circuloAbajo_1 = {
		rx: circleCenterX - curve_offset - rectHeight / 2,
		ry: rectPosY + rectHeight - inner_offset_half - rectHeight / 2,
		width: rectHeight / 2,
		height: rectHeight,
	};
	pop();

	/**
	 * Cajas de colisión (end)
	 */

	const esqueleto_1 = {
		rect_centro_1,
		rect_interior_centro_1,
		circulo_centro_1,
		circulo_interior_centro_1,
		circulo_arriba_1,
		circulo_interior_arriba_1,
		circulo_abajo_1,
		circulo_interior_abajo_1,
		rectColl_circuloArriba_1,
		rectColl_rectCentro_1,
		rectColl_circuloCentro_1,
		rectColl_circuloAbajo_1,
	};

	// doFloodFill(createVector(circleCenterX + 3, -rectHeight / 2 + 3));
	// doFloodFill(createVector(circleCenterX - 3, -rectHeight / 2 + 3));
	// doFloodFill(createVector(circleCenterX - curve_offset, -rectHeight / 2 + 3));
	// const puntosEq1 = generarPuntosEquidistantes(
	// 	{ x: circleCenterX - 3, y: -rectHeight / 2 + 3 },
	// 	{ x: circleCenterX - curve_offset, y: -rectHeight / 2 + 3 },
	// 	10,
	// 	false
	// );
	// puntosEq1.forEach((p) => {
	// 	doFloodFill(p);
	// });

	// doFloodFill(createVector(circleCenterX - 3, rectHeight / 2 - 3));
	// doFloodFill(createVector(circleCenterX - curve_offset, rectHeight / 2 - 3));
	// const puntosEq2 = generarPuntosEquidistantes(
	// 	{ x: circleCenterX - 3, y: rectHeight / 2 - 3 },
	// 	{ x: circleCenterX - curve_offset, y: rectHeight / 2 - 3 },
	// 	10,
	// 	false
	// );
	// puntosEq2.forEach((p) => {
	// 	doFloodFill(p);
	// });

	// doFloodFill(
	// 	createVector(
	// 		circleCenterX - curve_offset - rectHeight / 2 + 2,
	// 		rectPosY - rectHeight + inner_offset_half + 3
	// 	)
	// );
	// doFloodFill(
	// 	createVector(
	// 		circleCenterX - curve_offset - rectHeight / 2 + 2,
	// 		rectPosY + rectHeight - inner_offset_half - 3
	// 	)
	// );

	// -------- MIRRROR --------

	rectPosX = DISTANCIA_ENTRE_FIGURAS / 2;
	// rectWidth = width / 2;
	circleCenterX = rectPosX - rectWidth / 2;

	const rect_centro_2 = {
		rx: rectPosX,
		ry: rectPosY,
		width: rectWidth,
		height: rectHeight,
	};
	const rect_interior_centro_2 = {
		rx: rectPosX,
		ry: rectPosY,
		width: rectWidth,
		height: rectHeight - inner_offset,
	};
	const circulo_centro_2 = {
		cx: circleCenterX,
		cy: rectPosY,
		diameter: rectHeight,
	};
	const circulo_interior_centro_2 = {
		cx: circleCenterX,
		cy: rectPosY,
		diameter: rectHeight - inner_offset,
	};

	// circulo de arriba
	const circulo_arriba_2 = {
		cx: circleCenterX + curve_offset,
		cy: rectPosY - rectHeight + inner_offset_half,
		diameter: rectHeight,
	};
	const circulo_interior_arriba_2 = {
		cx: circleCenterX + curve_offset2,
		cy: rectPosY - rectHeight + inner_offset_half,
		diameter: rectHeight - inner_offset,
	};

	// circulo de abajo
	const circulo_abajo_2 = {
		cx: circleCenterX + curve_offset,
		cy: rectPosY + rectHeight - inner_offset_half,
		diameter: rectHeight,
	};
	const circulo_interior_abajo_2 = {
		cx: circleCenterX + curve_offset2,
		cy: rectPosY + rectHeight - inner_offset_half,
		diameter: rectHeight - inner_offset,
	};

	/**
	 * Cajas de colisión (start)
	 */
	push();
	const rectColl_circuloArriba_2 = {
		rx: circleCenterX + curve_offset,
		ry: rectPosY - rectHeight + inner_offset_half - rectHeight / 2,
		width: rectHeight / 2,
		height: rectHeight,
	};
	const rectColl_rectCentro_2 = {
		rx: circleCenterX,
		ry: rectPosY - rectHeight / 2,
		width: abs(circleCenterX + curve_offset - circleCenterX) - 1,
		height: rectHeight,
	};
	const rectColl_circuloCentro_2 = {
		rx: circleCenterX - rectHeight / 2,
		ry: rectPosY - rectHeight / 2,
		width: rectHeight / 2 - 1,
		height: rectHeight,
	};
	const rectColl_circuloAbajo_2 = {
		rx: circleCenterX + curve_offset,
		ry: rectPosY + rectHeight - inner_offset_half - rectHeight / 2,
		width: rectHeight / 2,
		height: rectHeight,
	};
	/**
	 * Cajas de colisión (end)
	 */
	const esqueleto_2 = {
		rect_centro_2,
		rect_interior_centro_2,
		circulo_centro_2,
		circulo_interior_centro_2,
		circulo_arriba_2,
		circulo_interior_arriba_2,
		circulo_abajo_2,
		circulo_interior_abajo_2,
		rectColl_circuloArriba_2,
		rectColl_rectCentro_2,
		rectColl_circuloCentro_2,
		rectColl_circuloAbajo_2,
	};
	pop();

	// doFloodFill(createVector(circleCenterX - 5, -rectHeight / 2 + 3));
	// doFloodFill(createVector(circleCenterX + 3, -rectHeight / 2 + 3));
	// doFloodFill(createVector(circleCenterX + curve_offset, -rectHeight / 2 + 3));
	// const puntosEq3 = generarPuntosEquidistantes(
	// 	{ x: circleCenterX + 3, y: -rectHeight / 2 + 3 },
	// 	{ x: circleCenterX + curve_offset, y: -rectHeight / 2 + 3 },
	// 	10,
	// 	false
	// );
	// puntosEq3.forEach((p) => {
	// 	doFloodFill(p);
	// });

	// doFloodFill(createVector(circleCenterX + 3, rectHeight / 2 - 3));
	// doFloodFill(createVector(circleCenterX + curve_offset, rectHeight / 2 - 3));
	// const puntosEq4 = generarPuntosEquidistantes(
	// 	{ x: circleCenterX + 3, y: rectHeight / 2 - 3 },
	// 	{ x: circleCenterX + curve_offset, y: rectHeight / 2 - 3 },
	// 	10,
	// 	false
	// );
	// puntosEq4.forEach((p) => {
	// 	doFloodFill(p);
	// });
	// doFloodFill(
	// 	createVector(
	// 		circleCenterX + curve_offset + rectHeight / 2 - 2,
	// 		rectPosY - rectHeight + inner_offset_half + 3
	// 	)
	// );
	// doFloodFill(
	// 	createVector(
	// 		circleCenterX + curve_offset + rectHeight / 2 - 2,
	// 		rectPosY + rectHeight - inner_offset_half - 3
	// 	)
	// );

	const tennisBall = new TennisBall({ esqueleto_1, esqueleto_2 }, true);
	tennisBall.drawCollBoxes();
	const p1 = createVector(mouseX, mouseY);
	tennisBall.checkPoint(p1);
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

function doFloodFill(seed, fillColor = [0, 0, 100]) {
	print("seed: ", seed.x, seed.y);
	push();
	translate(-CONFIGS.originX, -CONFIGS.originY);
	newSeed = createVector(
		round(seed.x + CONFIGS.originX),
		round(seed.y + CONFIGS.originY)
	);
	if (
		newSeed.x > width ||
		newSeed.x < 0 ||
		newSeed.y > height ||
		newSeed.y < 0
	) {
		pop();
		return;
	}
	loadPixels();

	print("width: ", width);
	print("height: ", height);
	print("newSeed.x: ", newSeed.x);
	print("newSeed.y: ", newSeed.y);
	print("total de pixeles: ", pixels.length);
	let index = 4 * (width * newSeed.y + newSeed.x);
	let seedColor = [pixels[index], pixels[index + 1], pixels[index + 2]];
	print(index);
	print("seedColor: ", seedColor);

	// solo se pinta si el seed color es diferente al fill color .... (TODO: y si el seed color es amarillo).
	if (u_arrayEquals(seedColor, fillColor)) {
		pop();
		return;
	}

	let queue = [];
	queue.push(newSeed);

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
