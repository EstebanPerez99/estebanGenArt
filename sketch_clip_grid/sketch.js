function setup() {
  createCanvas(400, 400);
  noLoop();
  rectMode(CENTER)
}

function draw() {
  background(220);
  push();
  beginClip();
  circle(0,0,200)
  endClip();
  fill(255,0,0)
  rect(10,10,160)
  pop();

  const grid = u_grid(10,10,true,0);
}
