function setup() {
	createCanvas(700, 700);
	rectMode(CENTER);
	// noLoop();
}

function draw() {
	background(230);
	stroke(0);

	// ******** Rectangulo ********
	const rectSpec = {
		rx: 150,
		ry: 100,
		width: 200,
		height: 100,
	};
	conditionalFill(u_isInsideRectangle_CENTER(mouseX, mouseY, rectSpec));
	// conditionalFill(u_isInsideRectangle_CORNER(mouseX, mouseY, rectSpec));
	rect(rectSpec.rx, rectSpec.ry, rectSpec.width, rectSpec.height);

	// ******** Intersección de 2 Rectangulos ********
	const intRect1Spec = {
		rx: 150,
		ry: height - 100,
		width: 200,
		height: 100,
	};
	const intRect2Spec = {
		rx: 150,
		ry: height - 100,
		width: 140,
		height: 70,
	};
	conditionalFill(
		u_isInsideHollowRectangle_CENTER(mouseX, mouseY, intRect1Spec, intRect2Spec)
		// u_isInsideHollowRectangle_CORNER(mouseX, mouseY, intRect1Spec, intRect2Spec)
	);
	rect(
		intRect1Spec.rx,
		intRect1Spec.ry,
		intRect1Spec.width,
		intRect1Spec.height
	);
	fill(230);
	rect(
		intRect2Spec.rx,
		intRect2Spec.ry,
		intRect2Spec.width,
		intRect2Spec.height
	);

	// ******** Circlulo ********
	const circleSpec = {
		cx: width - 125,
		cy: 125,
		diameter: 150,
	};
	conditionalFill(u_isInsideCircle(mouseX, mouseY, circleSpec));
	circle(circleSpec.cx, circleSpec.cy, circleSpec.diameter);

	// ******** Intersección de 2 Circlulos ********
	const intCircleSpec1 = {
		cx: width - 125,
		cy: height - 125,
		diameter: 150,
	};
	const intCircleSpec2 = {
		cx: width - 125,
		cy: height - 125,
		diameter: 100,
	};
	conditionalFill(
		u_isInsideHollowCircle(mouseX, mouseY, intCircleSpec1, intCircleSpec2)
	);
	circle(intCircleSpec1.cx, intCircleSpec1.cy, intCircleSpec1.diameter);
	fill(230);
	circle(intCircleSpec2.cx, intCircleSpec2.cy, intCircleSpec2.diameter);

	// mouse
	noStroke();
	fill(0);
	circle(mouseX, mouseY, 5);
}

const conditionalFill = (isInside) => {
	if (isInside) {
		fill(163, 244, 165);
	} else {
		fill(252, 144, 144);
	}
};
