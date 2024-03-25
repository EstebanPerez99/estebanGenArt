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

// hace grid y regresa puntos medios
function grid(cols, rows, draw = false) {
	const cellW = width / cols;
	const cellH = height / rows;
	const points = Array.from({ length: rows }, () => []);
	for (let y = 0; y < rows; y++) {
		for (let x = 0; x < cols; x++) {
			let xPoint = x * cellW + cellW / 2;
			let yPoint = y * cellH + cellH / 2;
			points[y].push({ x: xPoint, y: yPoint });
			if (draw) {
				circle(xPoint, yPoint, 1);
				rect(xPoint, yPoint, cellW, cellH);
			}
		}
	}
	return points;
}

/**
 * Genera puntos equidistantes entre dos puntos dados.
 * @param {Object} p1 - El primer punto en formato {x, y}.
 * @param {Object} p2 - El segundo punto en formato {x, y}.
 * @param {number} N - El número de puntos a generar (incluyendo p1 y p2).
 * @returns {Object[]} Un array de objetos que representan los puntos generados en formato {x, y}.
 */
function generarPuntosEquidistantes(p1, p2, N, draw = false) {
	let puntos = [];
	for (let i = 0; i < N; i++) {
		let t = i / (N - 1);
		let x = lerp(p1.x, p2.x, t);
		let y = lerp(p1.y, p2.y, t);
		if (draw) {
			circle(x, y, 5);
		}
		puntos.push({ x: x, y: y });
	}
	return puntos;
}
