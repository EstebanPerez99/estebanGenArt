const NOISE_WEIGHTS_SCALE = 0.001;
/**
 * DRAW
 */
const DRAW_STEP_1 = true;

function setup() {
  noiseSeed(1);
  angleMode(DEGREES);
  rectMode(CENTER);
  noLoop();

  createCanvas(700, 700);
  background(0);
}

function draw() {
  // dibujar grid

  const gridPoints = crearGrid(10, 10, DRAW_STEP_1);

  console.log(gridPoints);

  // dibujar linea
  let p1 = gridPoints[9][0];
  let p2 = gridPoints[0][9];

  // LINEA BLANCA ENTRE LOS 2 PUNTOS
  // stroke(255);
  // strokeWeight(5);
  // strokeCap(SQUARE);
  // line(p1.x, p1.y, p2.x, p2.y);

  // dibujar puntos en linea
  fill("red");
  noStroke();
  const puntosLinea = generarPuntosEquidistantes(p1, p2, 100, true);
  console.log({ puntosLinea });
}

/**
 * 1. Crear Grid
 */
const crearGrid = (grid_w, grid_h, draw = false) => {
  const gridPoints = u_grid(grid_w, grid_h, draw).map((rows) =>
    rows.map((cell) => {
      let nx = NOISE_WEIGHTS_SCALE * cell.x;
      let ny = NOISE_WEIGHTS_SCALE * cell.y;
      let weight = round(noise(nx, ny) * 20);

      return new GridPoint(cell.x, cell.y, weight, draw);
    })
  );

  return gridPoints;
};
