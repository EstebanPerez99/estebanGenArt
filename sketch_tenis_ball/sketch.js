function setup() {
  const canvasSize = random(500, 1000);
  createCanvas(canvasSize, canvasSize);
  rectMode(CENTER);
}

function draw() {
  const rectPosX = -100;
  const rectPosY = height / 2;
  const rectWidth = mouseX;
  const rectHeigth = height * 0.5;
  const circleCenterX = rectWidth / 2 + rectPosX;

  noStroke();
  background(220);
  fill(244, 226, 49);
  circle(width / 2, height / 2, width * 0.98);
  noFill();
  stroke(255);
  strokeWeight(1);

  const inner_offset = width * 0.025;
  const inner_offset_half = inner_offset / 2;

  rect(rectPosX, rectPosY, rectWidth, rectHeigth);
  circle(circleCenterX, rectPosY, rectHeigth);
  rect(rectPosX, rectPosY, rectWidth, rectHeigth - inner_offset);
  circle(circleCenterX, rectPosY, rectHeigth - inner_offset);

  const curve_offset = width * 0.175;
  const curve_offset2 = width * 0.181;
  // circulo de arriba
  circle(
    circleCenterX - curve_offset,
    rectPosY - rectHeigth + inner_offset_half,
    rectHeigth
  );
  circle(
    circleCenterX - curve_offset2,
    rectPosY - rectHeigth + inner_offset_half,
    rectHeigth - inner_offset
  );
  // circulo de abajo
  circle(
    circleCenterX - curve_offset,
    rectPosY + rectHeigth - inner_offset_half,
    rectHeigth
  );
  circle(
    circleCenterX - curve_offset2,
    rectPosY + rectHeigth - inner_offset_half,
    rectHeigth - inner_offset
  );

  // -------- MIRRROR --------

  rect(rectPosX + width, rectPosY, width - mouseX, rectHeigth);
  circle(circleCenterX + width / 2, rectPosY, rectHeigth);
  rect(rectPosX + width, rectPosY, width - mouseX, rectHeigth - inner_offset);
  circle(circleCenterX + width / 2, rectPosY, rectHeigth - inner_offset);
  // circulo de arriba
  circle(
    circleCenterX + width / 2 + curve_offset,
    rectPosY - rectHeigth + inner_offset_half,
    rectHeigth
  );
  circle(
    circleCenterX + width / 2 + curve_offset2,
    rectPosY - rectHeigth + inner_offset_half,
    rectHeigth - inner_offset
  );
  // circulo de abajo
  circle(
    circleCenterX + width / 2 + curve_offset,
    rectPosY + rectHeigth - inner_offset_half,
    rectHeigth
  );
  circle(
    circleCenterX + width / 2 + curve_offset2,
    rectPosY + rectHeigth - inner_offset_half,
    rectHeigth - inner_offset
  );
}

function keyTyped() {
  if (key === "S") {
    saveCanvas("ball_" + random(1, 100000), "jpeg");
  }
}
