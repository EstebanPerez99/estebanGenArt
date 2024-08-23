let particles = [];

function setup() {
  createCanvas(400, 400);
  background(245);
  colorMode(HSL);
  rectMode(CORNER);
  angleMode(DEGREES);
  //blendMode(OVERLAY); //resultados interesantes

  //noLoop();
  const colores = [
    { from: color(150, 76, 38, 0.05), to: color(227, 76, 38, 0.05) },
    { from: color(42, 76, 47, 0.05), to: color(65, 76, 47, 0.05) },
    { from: color(7, 82, 50, 0.05), to: color(22, 82, 50, 0.05) },
  ];

  for (let i = 0; i < 10; i++) {
    particles.push(new Particle(colores));
  }
}

function draw() {
  background(245, 47, 0, 1);
  for (let i = 0; i < particles.length; i++) {
    particles[i].createParticle();
    particles[i].moveParticle();
  }
}

class Particle {
  constructor(colores) {
    this.x = random(0, width);
    this.y = random(0, height);
    this.xSpeed = random(-2, 20);
    this.ySpeed = random(-1, 30);
    this.colorPicked = colores[round(random(0, colores.length - 1))];
  }

  createParticle() {
    let noiseScale = 0.01;
    let noiseVal = noise(noiseScale * frameCount);

    const from = this.colorPicked.from;
    const to = this.colorPicked.to;
    const angleLimit = 360;
    const initialAngle = random(0, 360);
    push();
    noStroke();
    translate(this.x, this.y);
    const angleShift = 360 * noiseVal;

    for (let i = 0; i < angleLimit; i += 2) {
      push();
      rotate(i + angleShift);
      let percentage = i / 360;
      let fillColor = lerpColor(from, to, percentage);
      fill(fillColor);
      rect(0, 0, 500, 5);
      pop();
    }
    fill(120, 0, 100, 0.8);
    circle(0, 0, 5);
    pop();
  }

  moveParticle() {
    if (this.x < 0 || this.x > width) this.xSpeed *= -1;
    if (this.y < 0 || this.y > height) this.ySpeed *= -1;
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }
}
