function setup() {
  createCanvas(400, 400);
  background(255);

  // Definir los puntos
  let x1 = 6;
  let y1 = 6;
  let x2 = 1;
  let y2 = 4;

  // Escalar los puntos para que sean visibles en el lienzo
  x1 *= 50;
  y1 *= 50;
  x2 *= 50;
  y2 *= 50;

  strokeWeight(1);
  line(x1, 0, x1, height);
  line(x2, 0, x2, height);

  // Dibujar los puntos
  strokeWeight(8);
  point(x1, height - y1);
  point(x2, height - y2);

  // Dibujar la línea
  strokeWeight(2);
  line(x1, height - y1, x2, height - y2);

  ///////////////////////////////////////////////////////////////////

  // Calcular la pendiente y la intersección con el eje y
  let m = (y2 - y1) / (x2 - x1);
  let b = y1 - m * x1;
  let x3 = x2 - 20;
  let y3 = m * x3 + b;
  strokeWeight(8);
  stroke(255, 0, 0);
  point(x3, height - y3);

  // calcular ecuacion de linea perpendicular
  let m_perp = -1 / m;
  let b_perp = y3 - m_perp * x3;
  strokeWeight(2);
  line(0, height - b_perp, width, height - (m_perp * width + b_perp));

  // en y3 +- 20 quiero calcular 2 valores nuevos para X
  let y_perp_1 = y3 - 20;
  let x_perp_1 = (y_perp_1 - b_perp) / m_perp;

  let y_perp_2 = y3 + 20;
  let x_perp_2 = (y_perp_2 - b_perp) / m_perp;

  stroke(0, 0, 255);
  strokeWeight(8);
  point(x_perp_1, height - y_perp_1);
  point(x_perp_2, height - y_perp_2);

  let d1 = dist(x_perp_1, y_perp_1, x1, y1);
  let d2 = dist(x_perp_2, y_perp_2, x1, y1);
  print("Distancia entre punto azul abajo y negro: ", d1);
  print("Distancia entre punto azul arriba y negro: ", d2);
  ///////////////////////////////////////////////////////////////////
  let x4 = x1 + 30;
  let y4 = m * x4 + b;
  strokeWeight(8);
  stroke(255, 0, 0);
  point(x4, height - y4);

  let b_perp2 = y4 - m_perp * x4;
  strokeWeight(2);
  line(0, height - b_perp2, width, height - (m_perp * width + b_perp2));

  // en y4 +- 30 quiero calcular 2 valores nuevos para X
  let y_perp_3 = y4 - 30;
  let x_perp_3 = (y_perp_3 - b_perp2) / m_perp;

  let y_perp_4 = y4 + 30;
  let x_perp_4 = (y_perp_4 - b_perp2) / m_perp;

  stroke(0, 0, 255);
  strokeWeight(8);
  point(x_perp_3, height - y_perp_3);
  point(x_perp_4, height - y_perp_4);

  let d3 = dist(x_perp_3, y_perp_3, x1, y1);
  let d4 = dist(x_perp_4, y_perp_4, x1, y1);
  print("Distancia entre punto azul abajo y negro: ", d3);
  print("Distancia entre punto azul arriba y negro: ", d4);

  strokeWeight(0);
  fill(color("rgba(0, 255, 0, 0.3)"));
  beginShape();
  vertex(x_perp_1, height - y_perp_1);
  vertex(x_perp_2, height - y_perp_2);
  vertex(x_perp_4, height - y_perp_4);
  vertex(x_perp_3, height - y_perp_3);
  vertex(x_perp_1, height - y_perp_1);
  endShape();

  // test
  let b_perp3 = y1 - m_perp * x1;
  strokeWeight(60);
  strokeCap(SQUARE);
  stroke(color("rgba(0, 255, 0, 0.3)"));
  line(x1, height - y1, 800, height - (m_perp * 800 + b_perp3));
}
