let particles = [];

function setup() {
  createCanvas(400, 400);
  background(245);
  colorMode(HSL);
  rectMode(CORNER);
  angleMode(DEGREES);
  //blendMode(OVERLAY); resultados interesantes

  //noLoop();
  const colores = [
    { from: color(150, 76, 38, 0.2), to: color(227, 76, 38, 0.2) },
    { from: color(42, 76, 47, 0.2), to: color(65, 76, 47, 0.2) },
    { from: color(7, 82, 50, 0.2), to: color(22, 82, 50, 0.2) },
  ];

  init1 = [random(-100, 100), random(-100, 100), colores[0]];
  init2 = [random(-100, 100), random(-100, 100), colores[1]];
  init3 = [random(-100, 100), random(-100, 100), colores[1]];
  init4 = [random(-100, 100), random(-100, 100), colores[2]];
}

function draw() {
  background(245, 47, 0, 0.1);
  particula(1000, init1[0], init1[1], init1[2]);
  particula(500, init2[0], init2[1], init2[2]);
  particula(500, init3[0], init3[1], init3[2]);
  particula(500, init4[0], init4[1], init4[2]);

  particula(500, init4[0], init4[1], init4[2]);
  particula(500, init2[0], init2[1], init2[2]);
  particula(500, init1[0], init1[1], init1[2]);
}

function particula(size, initiX, initY, colorPicked) {
  let noiseScale = 0.01;
  let noiseScaleMovementX = 0.005;
  let noiseScaleMovementY = 0.003;
  noStroke();
  const from = colorPicked.from;
  const to = colorPicked.to;
  const angleLimit = 360;
  const initialAngle = random(0, 360);
  //translate(mouseX, mouseY);
  let noiseVal = noise(noiseScale * frameCount);
  let noiseVal2 = noise(noiseScaleMovementX * frameCount);
  let noiseVal3 = noise(noiseScaleMovementY * frameCount);
  const x = initiX + width * noiseVal2;
  const y = initY + height * noiseVal3;

  push();
  translate(x, y);
  const angleShift = 360 * noiseVal;
  for (let i = 0; i < angleLimit; i += 1) {
    push();
    rotate(i + angleShift);
    let percentage = i / 360;
    let fillColor = lerpColor(from, to, percentage);
    fill(fillColor);
    rect(0, 0, size, 1);
    pop();
  }
  fill(120, 0, 100, 0.8);
  circle(0, 0, 5);
  pop();
}
