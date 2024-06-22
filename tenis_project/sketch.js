const NOISE_WEIGHTS_SCALE = 0.00091;
const FONDOS = [0, "rgb(25, 119, 191)"];
/**
 * DRAW
 */
const DRAW_GRID = false;
const DRAW_LINEAS_PERSPECTIVA = true;
function setup() {
  noiseSeed(1);
  // randomSeed(1);
  angleMode(DEGREES);
  rectMode(CENTER);
  noLoop();

  createCanvas(700, 700);
  background(color(FONDOS[1]));
}

function draw() {
  // nos vamos a desplazar para poder tener un contorno
  const numberOfCells = 20;
  const cellW = width / numberOfCells;
  const cellH = height / numberOfCells;
  push();
  translate(-cellW, -cellH);
  // dibujar grid
  const gridPoints = crearGrid(numberOfCells, numberOfCells, DRAW_GRID, 2);

  console.log(gridPoints);
  const baseLines = getBaseLines(gridPoints);
  console.log(baseLines);
  // dibujar linea
  // let p1 = gridPoints[gridPoints.length - 1][0];
  // let p2 = gridPoints[0][gridPoints.length - 1];
  // const linea1 = new LineaGrid(p1, p2);
  if (DRAW_LINEAS_PERSPECTIVA) {
    // linea1.dibujarLineaConPerspectiva();
    baseLines.forEach((l) => l.dibujarLineaConPerspectiva());
  }
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
      let weight = sq(round(noise(nx, ny) * 6));

      return new GridPoint(cell.x, cell.y, weight, draw);
    })
  );

  return gridPoints;
};

const getBaseLines = (gridPoints) => {
  const baseLines = [];
  const cols = gridPoints[0].length;
  const rows = gridPoints.length;
  const centerCol = round(cols / 2) - 1;
  const centerRow = round(rows / 2) - 1;
  for (let i = 0; i < round(random(1, 3)); i++) {
    if (random() >= 0.5) {
      // horizontal
      // la variacion en y es menor
      // se toman minimos y maximos en cols
      let startingPoint = round(random(rows - 1));
      let p1 = gridPoints[startingPoint][0];
      let endingPoint = _calcularInclinacion(
        startingPoint,
        round(random(0, centerRow)),
        rows - 1
      );
      let p2 = gridPoints[endingPoint][cols - 1];
      baseLines.push(new LineaGrid(p1, p2));
    } else {
      // vertical
      // la variacion en x es menor
      // se toman minimos y maximos en rows
      let startingPoint = round(random(cols - 1));
      let p1 = gridPoints[0][startingPoint];
      let endingPoint = _calcularInclinacion(
        startingPoint,
        round(random(0, centerCol)),
        cols - 1
      );
      let p2 = gridPoints[rows - 1][endingPoint];
      baseLines.push(new LineaGrid(p1, p2));
    }
  }
  return baseLines;
};

function _calcularInclinacion(start, distancia, limite) {
  let res = start + distancia <= limite ? start + distancia : start - distancia;
  if (res < 0) {
    res = random() >= 0.5 ? limite : 0;
  }

  return res;
}

function keyTyped() {
  if (key === "S") {
    save("img");
  }
}
