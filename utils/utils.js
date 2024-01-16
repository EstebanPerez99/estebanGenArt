function createSquare(w, h, randomRange) {
	const squareVertices = [];
	let startAngle = 45;
	const rw = random(w * randomRange[0], w * randomRange[1]);
	const rh = random(h * randomRange[0], h * randomRange[1]);
	for (let i = 0; i < 4; i++) {
		squareVertices.push({
			x: rw * cos(startAngle),
			y: rh * sin(startAngle),
		});
		startAngle += 360 / 4;
	}
	return squareVertices;
}
