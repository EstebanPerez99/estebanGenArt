const NOISE_WEIGHTS_SCALE = 0.001;
/**
 * DRAW
 */
const DRAW_STEP_1 = true;

function setup() {
  // noiseSeed(1);
  angleMode(DEGREES);
  rectMode(CENTER);
  noLoop();

  createCanvas(700, 700);
  background(0);
}

function draw() {
  // nos vamos a desplazar para poder tener un contorno
  const numberOfCells = 10;
  const cellW = width / numberOfCells;
  const cellH = height / numberOfCells;
  push();
  translate(-cellW, -cellH);
  // dibujar grid
  const gridPoints = crearGrid(numberOfCells, numberOfCells, DRAW_STEP_1, 2);

  console.log(gridPoints);

  // dibujar linea
  let p1 = gridPoints[gridPoints.length - 1][0];
  let p2 = gridPoints[0][gridPoints.length - 1];

  // LINEA BLANCA ENTRE LOS 2 PUNTOS
  // stroke(255);
  // strokeWeight(5);
  // strokeCap(SQUARE);
  // line(p1.x, p1.y, p2.x, p2.y);
  new LineaGrid(p1, p2);
  pop();
}

/**
 * 1. Crear Grid
 */
const crearGrid = (grid_w, grid_h, draw = false, padding = 0) => {
  const gridPoints = u_grid(grid_w, grid_h, draw, padding).map((rows) =>
    rows.map((cell) => {
      let nx = NOISE_WEIGHTS_SCALE * cell.x;
      let ny = NOISE_WEIGHTS_SCALE * cell.y;
      let weight = round(noise(nx, ny) * 20);

      return new GridPoint(cell.x, cell.y, weight, draw);
    })
  );

  return gridPoints;
};
