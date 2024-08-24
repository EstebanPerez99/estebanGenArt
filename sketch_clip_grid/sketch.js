const COLOR_ALPHA = 0.02;
let colores = [];
function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSL);
  rectMode(CENTER);
  angleMode(DEGREES);
  background(245, 47, 0, 1);

  colores = [
    {
      from: color(150, 76, 38, COLOR_ALPHA),
      to: color(227, 76, 38, COLOR_ALPHA),
    },
    {
      from: color(42, 76, 47, COLOR_ALPHA),
      to: color(65, 76, 47, COLOR_ALPHA),
    },
    { from: color(7, 82, 50, COLOR_ALPHA), to: color(22, 82, 50, COLOR_ALPHA) },
  ];
}

function draw() {
  const grid = u_grid(6, 6, false, 0);
  print(grid);
  for (let row = 1; row < grid.length - 1; row++) {
    for (let col = 1; col < grid[0].length - 1; col++) {
      const { x, y, w, h } = grid[row][col];

      // push();
      // beginClip();
      // rect(width / 2, height / 2, width * 0.8, height * 0.8);
      // endClip();
      // aqui dibujamos 0 (start)
      push();
      beginClip();
      push();
      translate(x, y);
      rotate(random(-15, 15));
      rect(0, 0, w * random(0.96, 1.1), h * random(0.96, 1.1));
      pop();
      endClip();

      // aqui dibujamos (start)
      push();
      rectMode(CORNER);
      background(245, 47, 0, 1);
      let particles = [];
      for (let i = 0; i < 35; i++) {
        particles.push(new Particle(colores));
      }

      for (let frames = 0; frames < 10; frames++) {
        for (let i = 0; i < particles.length; i++) {
          particles[i].createParticle();
          particles[i].moveParticle();
        }
      }
      pop();
      // aqui dibujamos (end)

      pop();
      // aqui dibujamos 0(end)
      // pop();
    }
  }
  noLoop();
}

class Particle {
  constructor(colores) {
    this.x = random(width * 0.2, width * 0.8);
    this.y = random(height * 0.2, height * 0.8);
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
      rect(0, 0, max(windowWidth, windowHeight), 1);
      pop();
    }
    fill(120, 0, 100, 0.6);
    circle(0, 0, 2);
    pop();
  }

  moveParticle() {
    if (this.x < width * 0.2 || this.x > width * 0.8) this.xSpeed *= -1;
    if (this.y < height * 0.2 || this.y > height * 0.8) this.ySpeed *= -1;
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }
}

function keyTyped() {
  if (key === "S") {
    saveCanvas("ClipGrid_" + random(1, 100000), "jpeg");
  }
}
