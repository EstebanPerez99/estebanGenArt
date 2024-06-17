function setup() {
  createCanvas(400, 400);
  background(255);

  const p1 = { x: 100, y: 100, weight: 10 };
  const p2 = { x: 300, y: 120, weight: 20 };

  dibujarLineaConPerspectiva(p1, p2);
}

function dibujarLineaConPerspectiva(dot1, dot2, draw = false) {
  if (dot1.x === dot2.x || dot1.y === dot2.y) {
    print("TODO: agregar soporte a rectas");
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
    drawDot(x1, y1);
    drawDot(x2, y2);
    drawLine(x1, y1, x2, y2);
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
    drawDot(x3, y3);
  }
  // calcular ecuacion de linea perpendicular
  let m_perp = -1 / m;
  let b_perp = y3 - m_perp * x3;
  if (draw) {
    drawLine(0, b_perp, width, m_perp * width + b_perp);
  }

  // en y3 +- weigth1 quiero calcular 2 valores nuevos para X
  let y_perp_1 = y3 - weight1;
  let x_perp_1 = (y_perp_1 - b_perp) / m_perp;

  let y_perp_2 = y3 + weight1;
  let x_perp_2 = (y_perp_2 - b_perp) / m_perp;

  if (draw) {
    stroke(0, 0, 255);
    drawDot(x_perp_1, y_perp_1);
    drawDot(x_perp_2, y_perp_2);
  }

  /**
   * Calculo de x4 -> punto a la derecha
   */
  let x4 = x2 + weight2;
  let y4 = m * x4 + b;
  if (draw) {
    stroke(255, 0, 0);
    drawDot(x4, y4);
  }

  let b_perp2 = y4 - m_perp * x4;
  if (draw) {
    drawLine(0, b_perp2, width, m_perp * width + b_perp2);
  }

  // en y4 +- weight2 quiero calcular 2 valores nuevos para X
  let y_perp_3 = y4 - weight2;
  let x_perp_3 = (y_perp_3 - b_perp2) / m_perp;

  let y_perp_4 = y4 + weight2;
  let x_perp_4 = (y_perp_4 - b_perp2) / m_perp;

  if (draw) {
    stroke(0, 0, 255);
    drawDot(x_perp_3, y_perp_3);
    drawDot(x_perp_4, y_perp_4);
  }

  // DRAW FINAL LINE
  strokeWeight(0);
  fill(color("rgba(0, 255, 0, 0.3)"));
  beginShape();
  vertex(x_perp_1, y_perp_1);
  vertex(x_perp_2, y_perp_2);
  vertex(x_perp_4, y_perp_4);
  vertex(x_perp_3, y_perp_3);
  vertex(x_perp_1, y_perp_1);
  endShape();
}

function drawDot(x, y, rgb = "0,0,0") {
  strokeWeight(8);
  point(x, y);
}

function drawLine(x1, y1, x2, y2) {
  strokeWeight(2);
  line(x1, y1, x2, y2);
}
