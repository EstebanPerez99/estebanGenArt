function setup() {
	createCanvas(windowWidth, windowHeight);
	pixelDensity(1);
	background(255, 204, 0);
}

function keyPressed() {
	if (key == " ") {
		floodFill(createVector(mouseX, mouseY), [random(255), 0, 0, 255]);
	}
}

function draw() {
	stroke(0);
	if (mouseIsPressed === true) {
		line(mouseX, mouseY, pmouseX, pmouseY);
	}
}
