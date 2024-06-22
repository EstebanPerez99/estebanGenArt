class LineaGrid {
  start;
  end;
  puntos;

  constructor(start, end) {
    this.start = start;
    this.end = end;
    fill("red");
    noStroke();
    this.puntos = generarPuntosEquidistantes(
      this.start,
      this.end,
      100, // numero
      false // dibujar
    );
    push();
    stroke(255);
    this._drawDot(this.start.x, this.start.y);
    this._drawDot(this.end.x, this.end.y);
    this._drawLine(this.start.x, this.start.y, this.end.x, this.end.y);
    pop();
  }

  dibujarLineaConPerspectiva(draw = false) {
    let dot1 = this.start;
    let dot2 = this.end;
    let p1, p2;
    // Dos puntos identicos
    if (dot1.x === dot2.x && dot1.y === dot2.y) {
      return;
    }
    // Revisar si la linea es vertical
    if (dot1.x === dot2.x) {
      p1 = dot1.y < dot2.y ? dot1 : dot2;
      p2 = dot2.y > dot1.y ? dot2 : dot1;

      this._dibujarLineaVerticalConPerspectiva(p1, p2, draw);
      return;
    }

    // Revisar si la linea es horizontal
    if (dot1.y === dot2.y) {
      p1 = dot1.x < dot2.x ? dot1 : dot2;
      p2 = dot2.x > dot1.x ? dot2 : dot1;

      this._dibujarLineaHorizontalConPerspectiva(p1, p2, draw);
      return;
    }

    // asegurarnos que siempre p1.x es menor a p2.x
    p1 = dot1.x < dot2.x ? dot1 : dot2;
    p2 = dot2.x > dot1.x ? dot2 : dot1;

    const x1 = p1.x;
    const y1 = p1.y;
    const weight1 = p1.weight;
    const x2 = p2.x;
    const y2 = p2.y;
    const weight2 = p2.weight;

    // Dibujar los puntos y linea
    if (draw) {
      this._drawDot(x1, y1);
      this._drawDot(x2, y2);
      this._drawLine(x1, y1, x2, y2);
    }

    // Calcular pendiente e interseccion en
    let m = (y2 - y1) / (x2 - x1);
    let b = y1 - m * x1;

    /**
     * Calculo de x3 -> punto a la ziquierda
     */
    let x3 = x1 - weight1;
    let y3 = m * x3 + b;

    if (draw) {
      stroke(255, 0, 0);
      this._drawDot(x3, y3);
    }
    // calcular ecuacion de linea perpendicular
    let m_perp = -1 / m;
    let b_perp = y3 - m_perp * x3;
    if (draw) {
      this._drawLine(0, b_perp, width, m_perp * width + b_perp);
    }

    // en y3 +- weigth1 quiero calcular 2 valores nuevos para X
    let y_perp_1 = y3 - weight1;
    let x_perp_1 = (y_perp_1 - b_perp) / m_perp;

    let y_perp_2 = y3 + weight1;
    let x_perp_2 = (y_perp_2 - b_perp) / m_perp;

    if (draw) {
      stroke(0, 0, 255);
      this._drawDot(x_perp_1, y_perp_1);
      this._drawDot(x_perp_2, y_perp_2);
    }

    /**
     * Calculo de x4 -> punto a la derecha
     */
    let x4 = x2 + weight2;
    let y4 = m * x4 + b;
    if (draw) {
      stroke(255, 0, 0);
      this._drawDot(x4, y4);
    }

    let b_perp2 = y4 - m_perp * x4;
    if (draw) {
      this._drawLine(0, b_perp2, width, m_perp * width + b_perp2);
    }

    // en y4 +- weight2 quiero calcular 2 valores nuevos para X
    let y_perp_3 = y4 - weight2;
    let x_perp_3 = (y_perp_3 - b_perp2) / m_perp;

    let y_perp_4 = y4 + weight2;
    let x_perp_4 = (y_perp_4 - b_perp2) / m_perp;

    if (draw) {
      stroke(0, 0, 255);
      this._drawDot(x_perp_3, y_perp_3);
      this._drawDot(x_perp_4, y_perp_4);
    }

    this._drawFinalLine(
      { x: x_perp_1, y: y_perp_1 },
      { x: x_perp_2, y: y_perp_2 },
      { x: x_perp_3, y: y_perp_3 },
      { x: x_perp_4, y: y_perp_4 }
    );
  }

  _dibujarLineaVerticalConPerspectiva(p1, p2, draw) {
    const x = p1.x;
    const y1 = p1.y;
    const y2 = p2.y;
    const weight1 = p1.weight;
    const weight2 = p2.weight;

    // Dibujar los puntos y linea
    if (draw) {
      this._drawDot(x, y1);
      this._drawDot(x, y2);
      this._drawLine(x, y1, x, y2);
    }

    /**
     * Calculo de y3 y y4 (puntos arriba y abajo)
     */
    let y3 = y1 - weight1;
    let y4 = y2 + weight2;

    // en x +- weigth1 quiero calcular 2 valores nuevos para X
    let x_perp_1 = x - weight1;
    let x_perp_2 = x + weight1;
    let x_perp_3 = x - weight2;
    let x_perp_4 = x + weight2;

    if (draw) {
      stroke(255, 0, 0);
      this._drawDot(x, y3);
      this._drawDot(x, y4);
      // Ecuacion de linea perpendicular
      this._drawLine(0, y3, width, y3);
      this._drawLine(0, y4, width, y4);
      // new dots
      stroke(0, 0, 255);
      this._drawDot(x_perp_1, y3);
      this._drawDot(x_perp_2, y3);
      this._drawDot(x_perp_3, y4);
      this._drawDot(x_perp_4, y4);
    }

    this._drawFinalLine(
      { x: x_perp_1, y: y3 },
      { x: x_perp_2, y: y3 },
      { x: x_perp_3, y: y4 },
      { x: x_perp_4, y: y4 }
    );
  }

  _dibujarLineaHorizontalConPerspectiva(p1, p2, draw) {
    const y = p1.y;
    const x1 = p1.x;
    const x2 = p2.x;
    const weight1 = p1.weight;
    const weight2 = p2.weight;

    // Dibujar los puntos y linea
    if (draw) {
      this._drawDot(x1, y);
      this._drawDot(x2, y);
      this._drawLine(x1, y, x2, y);
    }

    /**
     * Calculo de x3 y x4 (puntos izquierda y derecha)
     */
    let x3 = x1 - weight1;
    let x4 = x2 + weight2;

    // en y +- weigth1 quiero calcular 2 valores nuevos para y
    let y_perp_1 = y - weight1;
    let y_perp_2 = y + weight1;
    let y_perp_3 = y - weight2;
    let y_perp_4 = y + weight2;

    if (draw) {
      stroke(255, 0, 0);
      this._drawDot(x1, y);
      this._drawDot(x2, y);
      // Ecuacion de linea perpendicular
      this._drawLine(x3, 0, x3, height);
      this._drawLine(x4, 0, x4, height);
      // new dots
      stroke(0, 0, 255);
      this._drawDot(x3, y_perp_1);
      this._drawDot(x3, y_perp_2);
      this._drawDot(x4, y_perp_3);
      this._drawDot(x4, y_perp_4);
    }

    this._drawFinalLine(
      { x: x3, y: y_perp_1 },
      { x: x3, y: y_perp_2 },
      { x: x4, y: y_perp_3 },
      { x: x4, y: y_perp_4 }
    );
  }

  _drawDot(x, y, rgb = "0,0,0") {
    strokeWeight(8);
    point(x, y);
  }

  _drawLine(x1, y1, x2, y2) {
    strokeWeight(2);
    line(x1, y1, x2, y2);
  }

  _drawFinalLine(p1, p2, p3, p4) {
    strokeWeight(0);
    // fill(color("rgba(0, 255, 0, 0.3)"));
    fill(color("rgba(255, 255, 255, 1)"));
    beginShape();
    vertex(p1.x, p1.y);
    vertex(p2.x, p2.y);
    vertex(p4.x, p4.y);
    vertex(p3.x, p3.y);
    vertex(p1.x, p1.y);
    endShape();
  }
}
