let W = 0;
let H = 0;

function getFirstDot(data) {
	const allDots = [...data];
	let firstDot = allDots[0];
	let idx = 0;
	allDots.forEach((dot, index) => {
		if (dot.x < firstDot.x) {
			firstDot = dot;
			idx = index;
		}
	});
	allDots.splice(idx, 1);
	return [firstDot, allDots];
}

function getNextDot(allDots, currentDot) {
	let nextDot = allDots[0];
	let distToDot = dist(currentDot.x, currentDot.y, nextDot.x, nextDot.y);
	let idx = 0;
	allDots.forEach((dot, index) => {
		const newDist = dist(currentDot.x, currentDot.y, dot.x, dot.y);
		if (newDist < distToDot) {
			distToDot = newDist;
			idx = index;
			nextDot = dot;
		}
	});
	allDots.splice(idx, 1);
	return [nextDot, allDots];
}

function connectDots(data, currentDot) {
	if (data.length < 1) {
		return;
	}
	const allDots = [...data];
	const [next, newData] = getNextDot(allDots, currentDot);
	curveVertex(next.x, next.y);
	connectDots(newData, next);
}

let rectangles = [];

function setup() {
	// randomSeed("lorem2010dfksjfkdsh84y487w8423");
	W = windowWidth;
	H = windowHeight;
	createCanvas(W, H);
	angleMode(DEGREES);
	rectMode(CENTER);
	noLoop();
}

function draw() {
	background(217, 249, 217);

	// Definir los bordes
	const padding =
		random(0, 1) > 0.5 ? W * random(0.05, 0.12) : H * random(0.05, 0.12);
	const paddingVertices = [
		{ x: padding, y: padding },
		{ x: W - padding, y: padding },
		{ x: W - padding, y: H - padding },
		{ x: padding, y: H - padding },
	];

	// hacer canvas interno
	beginShape();
	noStroke();
	fill(0);
	paddingVertices.forEach((sq) => {
		vertex(sq.x, sq.y);
	});
	endShape(CLOSE);

	// hacer puntitos de fondo
	strokeWeight(1);
	for (let y = padding; y < height - padding; y = y + random(1, 3)) {
		for (let x = padding; x < width - padding; x = x + random(1, 3)) {
			// stroke(random(219, 226, 30), random(232, 252), random(218, 231));
			stroke(100, 100, 255, random(40, 200));
			point(x + random(-3, 3), y + random(-3, 3));
		}
	}

	const TOTAL_RECTS = 300;
	for (let i = 0; i < TOTAL_RECTS; i++) {
		const newRect = new Rectangle(rectangles, padding);
		if (newRect.active) {
			rectangles.push(newRect);
		}
	}
	// print("intentos: ", TOTAL_RECTS);
	// print("creados: ", rectangles.length);
	// console.log(rectangles);
	rectangles.forEach((rect) => {
		// rect.drawRect();
		// hacer dots dentro de un area determinada
		const dots = generateRandomDots(
			random(400, 600),
			rect.x - rect.w / 2,
			rect.x + rect.w / 2,
			rect.y - rect.h / 2,
			rect.y + rect.h / 2
		);
		// conectar puntos
		drawNeonLightFromDots(dots);
	});

	drawNeonLightCircle(150, 150);
	drawNeonLightCircle(200, 129);
}

function keyTyped() {
	if (key == "s") {
		saveCanvas("photo", "png");
	}
}

function strokeColor(r) {
	if (r > 80) {
		//blanco
		stroke(255, 255, 255, 50);
	} else if (r > 60) {
		// azul
		stroke(0, 0, random(110, 170), 50);
	} else if (r > 10) {
		// verde
		stroke(0, random(170, 255), 0, 50);
	} else {
		stroke(random(170, 255), random(170, 255), random(170, 255), 50);
	}
}

function generateRandomDots(
	maxDots,
	x_minOrigin,
	x_maxOrigin,
	y_minOrigin,
	y_maxOrigin
) {
	let dots = [];
	const configObject = {
		intentosDeSetear: 20,
		padding: 0,
		margenEntrePuntos: -1,
		minRadioCircles: 1,
		x_minOrigin,
		x_maxOrigin,
		y_minOrigin,
		y_maxOrigin,
	};
	for (let i = 0; i < maxDots; i++) {
		const newDot = new Dot(dots, configObject);
		if (newDot.active) {
			dots.push(newDot);
		}
	}
	return dots;
}

function drawNeonLightFromDots(dots) {
	const [firstDot, allDots] = getFirstDot(dots);
	const maxLightWidth = 17;
	const minLightWidth = 2;
	strokeColor(random(1, 100));
	strokeJoin(ROUND);
	noFill();
	for (let lw = maxLightWidth; lw >= minLightWidth; lw -= 3) {
		strokeWeight(lw);
		beginShape();
		curveVertex(firstDot.x, firstDot.y);
		connectDots(allDots, firstDot);
		endShape();
	}

	stroke(255);
	beginShape();
	curveVertex(firstDot.x, firstDot.y);
	connectDots(allDots, firstDot);
	endShape();
}

function drawNeonLightCircle(x, y) {
	const maxLightWidth = 14;
	const minLightWidth = 2;
	strokeColor(100); //blanco
	noFill();
	for (let lw = maxLightWidth; lw >= minLightWidth; lw -= 4) {
		strokeWeight(lw);
		circle(x, y, 1);
	}

	// stroke(255, 255, 255, 0.8);
	noStroke();
	fill(255);
	circle(x, y, 4);
}
