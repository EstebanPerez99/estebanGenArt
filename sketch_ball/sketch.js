let l = 900;
let circular_shape = true;

let flow_cell_size = 4;
let number_of_layers = 2;

let noise_size = 0.001;
let noise_radius = 0.002;

let flow_l = l / flow_cell_size;

let flow_grid = [];

function setup() {
  createCanvas(l, l);
  noLoop();
  strokeWeight(3);
  colorMode(HSB, 360, 100, 100, 255);
}
function draw() {
  background("#222");
  for (var i = 0; i < number_of_layers; i++) {
    init_flow();
    display_flow();
  }
}

function init_flow() {
  flow_grid = [];
  for (let i = 0; i < flow_l; i++) {
    let row = [];
    for (let j = 0; j < flow_l; j++) {
      row.push(calculate_flow(j * noise_size, i * noise_size, noise_radius));
    }
    flow_grid.push(row);
  }
}

function calculate_flow(x, y, r) {
  let mean_arrow = createVector(0, 0);
  let radial_samples = 8;
  for (var i = 0; i < radial_samples; i++) {
    let angle = random(PI);
    let pos1 = createVector(x + cos(angle) * r, y + sin(angle) * r);
    let pos2 = createVector(x + cos(angle + PI) * r, y + sin(angle + PI) * r);

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

function display_flow() {
  for (let i = 0; i < flow_grid.length; i++) {
    for (let j = 0; j < flow_grid[i].length; j++) {
      if (
        !circular_shape ||
        inside_radius(
          i - flow_grid.length / 2,
          j - flow_grid[i].length / 2,
          (l / 2) * 0.24
        )
      ) {
        let h = random(50, 60); // Aproximadamente el tono del amarillo en HSB
        let s = random(80, 100); // Saturación
        let b = random(85, 100); // Brillo
        stroke(h, s, b, random(85, 215));
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

function inside_radius(x, y, r) {
  return sqrt(pow(x, 2) + pow(y, 2)) < r;
}

keyPressed = function () {
  if (keyCode === 80) {
    saveCanvas("noise_grid", "jpeg");
  }
};
