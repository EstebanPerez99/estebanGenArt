let INCLINATION = 0;
let CONFIGS = { originX: 0, originY: 0 };
function setup() {
	// randomSeed(1);
	createCanvas(1600, 1600);
	rectMode(CENTER);
	angleMode(DEGREES);
	colorMode(HSL);
	// pixelDensity(1);
	print("pixelDensity: ", pixelDensity());
	CONFIGS.pixelDensity = pixelDensity();
	noLoop();
	// background(0, 0, 86);
	background("#222");
}

function draw() {
	fill(0, 100, 50);
	textSize(20);
	textAlign(LEFT, TOP);
	text(INCLINATION, 10, 10);

	new TennisBall(
		{
			x: 150,
			y: 400,
			d: 200,
		},
		false
	);
	new TennisBall(
		{
			x: 450,
			y: 400,
			d: 300,
		},
		false
	);
	new TennisBall(
		{
			x: 850,
			y: 400,
			d: 400,
		},
		false
	);
}

function keyTyped() {
	if (key === "S") {
		saveCanvas("ball_" + random(1, 100000), "jpeg");
	}
}

function keyPressed() {
	if (keyCode === UP_ARROW) {
		INCLINATION += 10;
	} else if (keyCode === DOWN_ARROW) {
		INCLINATION -= 10;
	}
	if (INCLINATION < 0) {
		INCLINATION = 360;
	}
	if (INCLINATION > 360) {
		INCLINATION = 0;
	}
}
