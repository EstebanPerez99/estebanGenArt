function setup() {
	createCanvas(400, 400);
	background(245);
	colorMode(HSL);
	rectMode(CORNER);
	angleMode(DEGREES);
	noLoop();
}

function draw() {
	noStroke();
	let from = color(150, 76, 38);
	let to = color(227, 76, 38);
	translate(width / 2, height / 2);
	for (let i = 0; i < 360; i += 2) {
		push();
		rotate(i);
		let percentage = i / 360;
		let fillColor = lerpColor(from, to, percentage);
		fill(fillColor);
		rect(0, 0, 100, 4);
		pop();
	}
}
