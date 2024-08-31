class TennisBall {
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
