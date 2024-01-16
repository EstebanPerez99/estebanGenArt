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

// an array to add multiple dots
let dots = [];

function setup() {
	noLoop();
	noFill();
	createCanvas(520, 400);
	const TOTAL_DOTS = 20;
	const configObject = {
		intentosDeSetear: 20,
		padding: 140,
		margenEntrePuntos: 1,
		minRadioCircles: 1,
		x_minOrigin: 0,
		x_maxOrigin: width,
		y_minOrigin: 0,
		y_maxOrigin: height,
	};
	for (let i = 0; i < TOTAL_DOTS; i++) {
		const newDot = new Dot(dots, configObject);
		if (newDot.active) {
			dots.push(newDot);
		}
	}
	print("intentos: ", TOTAL_DOTS);
	print("creados: ", dots.length);
}

function draw() {
	background(0);
	const [firstDot, allDots] = getFirstDot(dots);
	const maxLightWidth = 20;
	stroke(0, random(170, 255), 0, 50);
	strokeJoin(ROUND);
	noFill();
	for (let lw = maxLightWidth; lw >= maxLightWidth * 0.2; lw -= 5) {
		strokeWeight(lw);
		beginShape();
		curveVertex(firstDot.x, firstDot.y);
		connectDots(allDots, firstDot);
		endShape(CLOSE);
	}

	stroke(255);
	beginShape();
	curveVertex(firstDot.x, firstDot.y);
	connectDots(allDots, firstDot);
	endShape(CLOSE);
}
