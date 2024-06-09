class GridPoint {
  x;
  y;
  weight;

  constructor(x, y, weight, draw) {
    this.x = x;
    this.y = y;
    this.weight = weight;
    if (draw) {
      this.drawPointWeight();
    }
  }

  drawPointWeight() {
    push();
    fill(0, 255, 0);
    strokeWeight(0);
    textAlign(CENTER, CENTER);
    text(round(this.weight), this.x, this.y);
    pop();
  }
}
