const NOISE_SCALE = 0.001;

function setup() {
  noiseSeed(1);
  createCanvas(800, 800);
  background("skyblue");
  angleMode(DEGREES);
  rectMode(CENTER);
  noLoop();
}
function draw() {
  noFill();
  stroke("#3b3b3b");
  const gridPoints = u_grid(10, 10);
  gridPoints.forEach((row) => {
    push();
    fill(0);
    stroke(0);
    strokeWeight(0);
    textAlign(CENTER, CENTER);
    row.forEach((p) => {
      let nx = NOISE_SCALE * p.x;
      let ny = NOISE_SCALE * p.y;
      let noiseVal = noise(nx, ny) * 20;
      text(round(noiseVal), p.x, p.y);
    });
    pop();
  });
}
