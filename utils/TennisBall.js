class TennisBall {
	cajasColision;
	esqueleto1;
	esqueleto2;
	circles;
	rectangles;
	constructor(spec, draw) {
		this.generate(spec.x, spec.y, spec.d, draw, spec.ballStyleSpec);
	}

	generate(ballX, ballY, ballD, draw, ballStyleSpec) {
		push();

		noStroke();
		// fill(55, 90, 57); // amarillo
		// circle(ballX, ballY, ballD);
		noFill();

		const rallasShiftX =
			ballX + random(0, ballD * 0.8) * (random() >= 0.5 ? 1 : -1);
		const rallasShiftY = ballY;

		translate(rallasShiftX, rallasShiftY);
		// CONFIGS = { originX: rallasShiftX, originY: rallasShiftY };
		const DISTANCIA_ENTRE_FIGURAS = ballD + ballD * 0.9; // 0.8

		let rectPosX = -DISTANCIA_ENTRE_FIGURAS / 2;
		let rectPosY = 0;
		let rectWidth = ballD * 0.5;
		let rectHeight = ballD * 0.85; // 0.8 tamaño de circulo!
		let circleCenterX = rectWidth / 2 + rectPosX;

		const inner_offset = ballD * 0.07; //0.025 grosor de linea blanca
		const inner_offset_half = inner_offset / 2;
		rotate(0);
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

		const curve_offset = ballD * 0.175;
		const curve_offset2 = ballD * 0.181;

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
		const rectColl_circuloArriba_1 = {
			rx: circleCenterX - curve_offset - rectHeight / 2,
			ry: rectPosY - rectHeight + inner_offset_half - rectHeight / 2,
			width: rectHeight / 2,
			height: rectHeight,
			collisionDetails: {
				type: "circle",
				outer: circulo_arriba_1,
				inner: circulo_interior_arriba_1,
			},
		};
		const rectColl_rectCentro_1 = {
			rx: circleCenterX - curve_offset,
			ry: rectPosY - rectHeight / 2,
			width: abs(circleCenterX - curve_offset - circleCenterX),
			height: rectHeight,
			collisionDetails: {
				type: "rect",
				outer: rect_centro_1,
				inner: rect_interior_centro_1,
			},
		};
		const rectColl_circuloCentro_1 = {
			rx: circleCenterX,
			ry: rectPosY - rectHeight / 2,
			width: rectHeight / 2,
			height: rectHeight,
			collisionDetails: {
				type: "circle",
				outer: circulo_centro_1,
				inner: circulo_interior_centro_1,
			},
		};
		const rectColl_circuloAbajo_1 = {
			rx: circleCenterX - curve_offset - rectHeight / 2,
			ry: rectPosY + rectHeight - inner_offset_half - rectHeight / 2,
			width: rectHeight / 2,
			height: rectHeight,
			collisionDetails: {
				type: "circle",
				outer: circulo_abajo_1,
				inner: circulo_interior_abajo_1,
			},
		};

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
		const rectColl_circuloArriba_2 = {
			rx: circleCenterX + curve_offset,
			ry: rectPosY - rectHeight + inner_offset_half - rectHeight / 2,
			width: rectHeight / 2,
			height: rectHeight,
			collisionDetails: {
				type: "circle",
				outer: circulo_arriba_2,
				inner: circulo_interior_arriba_2,
			},
		};
		const rectColl_rectCentro_2 = {
			rx: circleCenterX,
			ry: rectPosY - rectHeight / 2,
			width: abs(circleCenterX + curve_offset - circleCenterX),
			height: rectHeight,
			collisionDetails: {
				type: "rect",
				outer: rect_centro_2,
				inner: rect_interior_centro_2,
			},
		};
		const rectColl_circuloCentro_2 = {
			rx: circleCenterX - rectHeight / 2,
			ry: rectPosY - rectHeight / 2,
			width: rectHeight / 2,
			height: rectHeight,
			collisionDetails: {
				type: "circle",
				outer: circulo_centro_2,
				inner: circulo_interior_centro_2,
			},
		};
		const rectColl_circuloAbajo_2 = {
			rx: circleCenterX + curve_offset,
			ry: rectPosY + rectHeight - inner_offset_half - rectHeight / 2,
			width: rectHeight / 2,
			height: rectHeight,
			collisionDetails: {
				type: "circle",
				outer: circulo_abajo_2,
				inner: circulo_interior_abajo_2,
			},
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
		// set global variable
		this.circles = [
			circulo_centro_2,
			circulo_interior_centro_2,
			circulo_arriba_2,
			circulo_interior_arriba_2,
			circulo_abajo_2,
			circulo_interior_abajo_2,
			circulo_centro_1,
			circulo_interior_centro_1,
			circulo_arriba_1,
			circulo_interior_arriba_1,
			circulo_abajo_1,
			circulo_interior_abajo_1,
		];
		this.rectangles = [
			rect_centro_1,
			rect_interior_centro_1,
			rect_centro_2,
			rect_interior_centro_2,
		];
		this.cajasColision = [
			rectColl_circuloArriba_1,
			rectColl_rectCentro_1,
			rectColl_circuloCentro_1,
			rectColl_circuloAbajo_1,
			rectColl_circuloArriba_2,
			rectColl_rectCentro_2,
			rectColl_circuloCentro_2,
			rectColl_circuloAbajo_2,
		];
		if (draw) {
			this.drawCircles();
			this.drawRectangles();
			this.drawCollBoxes();
		}
		// (start) dibujar pelota
		this.drawBall(ballX - rallasShiftX, 0, ballD, ballStyleSpec);
		// (end)

		pop();
	}

	drawCircles() {
		this.circles.forEach((shape) => {
			circle(shape.cx, shape.cy, shape.diameter);
		});
	}
	drawRectangles() {
		this.rectangles.forEach((shape) => {
			rect(shape.rx, shape.ry, shape.width, shape.height);
		});
	}
	drawCollBoxes() {
		push();
		rectMode(CORNER);
		stroke(120, 100, 50);
		this.cajasColision.forEach((shape) => {
			rect(shape.rx, shape.ry, shape.width, shape.height);
		});
		pop();
	}

	getColor(punto) {
		let h = random(50, 60);
		let s = random(80, 100);
		let l = random(45, 60);
		let hiloColor = color(h, s, l, random(0.5, 1));
		for (const item of this.cajasColision) {
			if (u_isInsideRectangle_CORNER(punto.x, punto.y, item)) {
				const details = item.collisionDetails;
				if (details.type === "circle") {
					if (
						u_isInsideHollowCircle(
							punto.x,
							punto.y,
							details.outer,
							details.inner
						)
					) {
						hiloColor = color(0, 0, 100);
					}
				} else {
					if (
						u_isInsideHollowRectangle_CENTER(
							punto.x,
							punto.y,
							details.outer,
							details.inner
						)
					) {
						hiloColor = color(0, 0, 100);
					}
				}
				break;
			}
		}
		return hiloColor;
	}

	drawBall(x, y, diameter, spec) {
		push();
		const r = diameter / 2;
		translate(x - r, y - r);
		let flow_cell_size = 4; // 4
		let number_of_layers = 1; // 2 ideal para densidads
		let flow_l = diameter / flow_cell_size; // el tamaño del grid - 225*225
		const { noise_size, noise_radius, drawFrame } = spec;
		for (var i = 0; i < number_of_layers; i++) {
			let flow_grid = this.init_flow(flow_l, noise_size, noise_radius);
			this.display_flow(flow_grid, diameter, flow_cell_size, x);
		}
		if (drawFrame) {
			push();
			rectMode(CORNER);
			noFill();
			strokeWeight(1);
			stroke(223, 100, 46);
			rect(0, 0, diameter);
			pop();
		}
		pop();
	}
	init_flow(flow_l, noise_size, noise_radius) {
		const flow_grid = [];
		for (let i = 0; i < flow_l; i++) {
			let row = [];
			for (let j = 0; j < flow_l; j++) {
				row.push(
					this.calculate_flow(j * noise_size, i * noise_size, noise_radius)
				);
			}
			flow_grid.push(row);
		}
		return flow_grid;
	}

	calculate_flow(x, y, r) {
		let mean_arrow = createVector(0, 0);
		let radial_samples = 8; //8 numero ideal para ocnseguir un buen promedio de movimiento
		for (var i = 0; i < radial_samples; i++) {
			let angle = random(180);
			let pos1 = createVector(x + cos(angle) * r, y + sin(angle) * r);
			let pos2 = createVector(
				x + cos(angle + 180) * r,
				y + sin(angle + 180) * r
			);

			let val1 = noise(pos1.x, pos1.y);
			let val2 = noise(pos2.x, pos2.y);

			let hilo = p5.Vector.sub(pos1, pos2)
				.normalize()
				.mult(val1 - val2);

			mean_arrow.add(hilo);
		}
		mean_arrow.div(radial_samples);
		return mean_arrow;
	}

	display_flow(flow_grid, diameter, flow_cell_size, offset_x) {
		for (let i = 0; i < flow_grid.length; i++) {
			for (let j = 0; j < flow_grid[i].length; j++) {
				if (
					this.inside_radius(
						i - flow_grid.length / 2,
						j - flow_grid[i].length / 2,
						(diameter / 2) * 0.25
					)
				) {
					push();
					const r = diameter / 2;
					const x =
						j * flow_cell_size <= r + offset_x
							? -1 * r + j * flow_cell_size + offset_x
							: r - j * flow_cell_size - offset_x;
					const y =
						i * flow_cell_size <= r
							? -1 * r + i * flow_cell_size
							: r - i * flow_cell_size;
					const ballColor = this.getColor({ x, y });
					pop();
					stroke(ballColor);
					strokeWeight(3);
					line(
						j * flow_cell_size,
						i * flow_cell_size,
						j * flow_cell_size + flow_grid[i][j].x * flow_cell_size * 1200,
						i * flow_cell_size + flow_grid[i][j].y * flow_cell_size * 1200
					);
				}
			}
		}
	}

	inside_radius(x, y, r) {
		return sqrt(pow(x, 2) + pow(y, 2)) < r;
	}
}

class TennisBall_legacy {
	cajasColision;
	esqueleto1;
	esqueleto2;
	circles;
	rectangles;
	constructor(esqueleto, draw) {
		this.esqueleto1 = esqueleto.esqueleto_1;
		this.esqueleto2 = esqueleto.esqueleto_2;
		const {
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
		} = this.esqueleto1;
		const {
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
		} = this.esqueleto2;
		this.circles = [
			circulo_centro_2,
			circulo_interior_centro_2,
			circulo_arriba_2,
			circulo_interior_arriba_2,
			circulo_abajo_2,
			circulo_interior_abajo_2,
			circulo_centro_1,
			circulo_interior_centro_1,
			circulo_arriba_1,
			circulo_interior_arriba_1,
			circulo_abajo_1,
			circulo_interior_abajo_1,
		];
		this.rectangles = [
			rect_centro_1,
			rect_interior_centro_1,
			rect_centro_2,
			rect_interior_centro_2,
		];
		this.cajasColision = [
			rectColl_circuloArriba_1,
			rectColl_rectCentro_1,
			rectColl_circuloCentro_1,
			rectColl_circuloAbajo_1,
			rectColl_circuloArriba_2,
			rectColl_rectCentro_2,
			rectColl_circuloCentro_2,
			rectColl_circuloAbajo_2,
		];
		if (draw) {
			this.drawCircles();
			this.drawRectangles();
		}
	}

	drawCircles() {
		this.circles.forEach((shape) => {
			circle(shape.cx, shape.cy, shape.diameter);
		});
	}
	drawRectangles() {
		this.rectangles.forEach((shape) => {
			rect(shape.rx, shape.ry, shape.width, shape.height);
		});
	}
	drawCollBoxes() {
		push();
		rectMode(CORNER);
		stroke(120, 100, 50);
		this.cajasColision.forEach((shape) => {
			rect(shape.rx, shape.ry, shape.width, shape.height);
		});
		pop();
	}

	checkPoint(punto) {
		push();
		for (const item of this.cajasColision) {
			if (u_isInsideRectangle_CORNER(punto.x, punto.y, item)) {
				const details = item.collisionDetails;
				if (details.type === "circle") {
					if (
						u_isInsideHollowCircle(
							punto.x,
							punto.y,
							details.outer,
							details.inner
						)
					) {
						console.log("Está dentro!");
						fill(0, 0, 0);
					}
				} else {
					if (
						u_isInsideHollowRectangle_CENTER(
							punto.x,
							punto.y,
							details.outer,
							details.inner
						)
					) {
						console.log("Está dentro!");
						fill(0, 0, 0);
					}
				}
				break;
			}
			fill(0, 0, 98);
			console.log("No está dentro!");
		}
		circle(punto.x, punto.y, 15);
		point(punto);
		pop();
	}
}
