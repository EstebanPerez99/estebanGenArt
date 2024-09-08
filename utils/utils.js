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
function u_grid(cols, rows, draw = false, padding = 0) {
	const cellW = width / cols;
	const cellH = height / rows;
	const points = Array.from({ length: rows + padding }, () => []);
	for (let y = 0; y < rows + padding; y++) {
		for (let x = 0; x < cols + padding; x++) {
			let xPoint = x * cellW + cellW / 2;
			let yPoint = y * cellH + cellH / 2;
			points[y].push({ x: xPoint, y: yPoint, w: cellW, h: cellH });
			if (draw) {
				push();
				noFill();
				stroke("#3b3b3b");
				strokeWeight(1);
				circle(xPoint, yPoint, 1);
				rect(xPoint, yPoint, cellW, cellH);
				pop();
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

function u_arrayEquals(a, b) {
	return Array.isArray(a) && Array.isArray(b) && a.toString() === b.toString();
}

function u_expandToNeighbors(queue, current) {
	x = current.x;
	y = current.y;

	if (x - 1 > 0) {
		queue.push(createVector(x - 1, y));
	}

	if (x + 1 < width) {
		queue.push(createVector(x + 1, y));
	}

	if (y - 1 > 0) {
		queue.push(createVector(x, y - 1));
	}

	if (y + 1 < height) {
		queue.push(createVector(x, y + 1));
	}

	return queue;
}

function floodFill(seed, fillColor) {
	loadPixels();

	index = 4 * (width * seed.y + seed.x);
	seedColor = [
		pixels[index],
		pixels[index + 1],
		pixels[index + 2],
		pixels[index + 3],
	];

	if (u_arrayEquals(seedColor, fillColor)) {
		return;
	}

	let queue = [];
	queue.push(seed);

	while (queue.length) {
		let current = queue.shift();
		index = 4 * (width * current.y + current.x);
		let color = [
			pixels[index],
			pixels[index + 1],
			pixels[index + 2],
			pixels[index + 3],
		];

		if (!u_arrayEquals(color, seedColor)) {
			continue;
		}

		for (let i = 0; i < 4; i++) {
			pixels[index + i] = fillColor[0 + i];
		}

		queue = u_expandToNeighbors(queue, current);
	}

	updatePixels();
}

/**
 * se espera el angle mode en DEGREES!!!!
 *
 * Esta función invierte una transformación que incluye una traslación y una rotación.
 * Devuelve las coordenadas originales de un punto dado después de haber sido trasladado y rotado.
 *
 * @param {number} xp - Coordenada X del punto después de la traslación y rotación.
 * @param {number} yp - Coordenada Y del punto después de la traslación y rotación.
 * @param {number} theta - Ángulo de rotación en grados (si se usa `angleMode(DEGREES)`).
 * @param {number} trans_x - Traslación aplicada en el eje X.
 * @param {number} trans_y - Traslación aplicada en el eje Y.
 *
 * @returns {object} - Un objeto con las coordenadas originales { x, y } antes de la rotación y traslación.
 */
function u_RotacionTraslacionInversa(xp, yp, theta, trans_x, trans_y) {
	// Aplicar rotación inversa
	let xpp = xp * cos(theta) + yp * sin(theta);
	let ypp = -xp * sin(theta) + yp * cos(theta);

	// Aplicar traslación inversa
	let x = xpp + trans_x;
	let y = ypp + trans_y;

	// Devolver el resultado como un objeto con las coordenadas originales
	return { x: x, y: y };
}

/**
 * Calcula las coordenadas después de la rotación
 *
 * @param {number} x - Coordenada X
 * @param {number} y - Coordenada Y
 * @param {number} theta - Ángulo de rotación en grados (si se usa `angleMode(DEGREES)`).
 *
 * @returns {object} - Un objeto con las nuevas coordenadas { x', y' } después de la rotación.
 */
function u_calcularRotacion(x, y, theta) {
	let xp = x * cos(theta) - y * sin(theta);
	let yp = x * sin(theta) + y * cos(theta);

	return { xp: xp, yp: yp };
}
