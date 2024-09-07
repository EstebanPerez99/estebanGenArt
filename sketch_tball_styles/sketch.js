function setup() {
  createCanvas(1000, 1000);
  colorMode(HSL);
  rectMode(CENTER);
  angleMode(DEGREES);
  background(245, 47, 0, 1);
  noLoop();
}

function draw() {
  const colores = loadColors();
  const grid = u_grid(2, 2, false, 0);
  let count = 0;
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      const { x, y, w, h } = grid[row][col];
      noStroke();
      fill(colores[count]);
      rect(x, y, w, h);
      new TennisBall(
        {
          x,
          y,
          d: w * 0.9,
          ballStyleSpec: {
            /**
             * noise_size: 0.001,
             * noise_radius: 0.01
             *Esta combinacion hace efecto de velocidad
             */
            noise_size: random(0.1, 0.002), // esto ordena o desordena los hilos, entre mas chico mas random - 0.001
            noise_radius: random(0.01, 0.002), //  esto hace los hilos mas grandes o mas chicos, entre mas chico mas largos - 0.002
            drawFrame: false,
          },
        },
        false
      );
      count = (count + 1) % colores.length;
    }
  }
}

function keyTyped() {
  if (key === "S") {
    saveCanvas("ball_" + random(1, 100000), "jpeg");
  }
}

function loadColors() {
  const usOpen_blue = color(227.1, 82.3, 28.8);
  const usOpen_blue2 = color(215.4, 42.4, 36.1);
  const wimbledon_verde = color(144.5, 39.8, 32.5);
  const wimbledon_morado = color(261.4, 63, 37.1);
  return [usOpen_blue, usOpen_blue2, wimbledon_verde, wimbledon_morado];
}
