function setup() {
	// randomSeed(1);
	createCanvas(1200, 900);
	rectMode(CENTER);
	angleMode(DEGREES);
	colorMode(HSL);
	// pixelDensity(1);
	print("pixelDensity: ", pixelDensity());
	// CONFIGS.pixelDensity = pixelDensity();
	noLoop();
	// background(0, 0, 86);
	// background("#222");
	background(color(227.1, 82.3, 28.8));
}

function draw() {
	new TennisBall(
		{
			x: 0,
			y: 550,
			d: 200,
			ballStyleSpec: {
				/**
				 * noise_size: 0.001,
				 * noise_radius: 0.01
				 *Esta combinacion hace efecto de velocidad
				 *
				 * Peloas locas: noise_size: random(0.1, 0.002), noise_radius: random(0.01, 0.002),
				 */
				noise_size: 0.002, // esto ordena o desordena los hilos, entre mas chico mas random - 0.001
				noise_radius: 0.002, //  esto hace los hilos mas grandes o mas chicos, entre mas chico mas largos - 0.002
				drawFrame: false,
				fillBackground: false,
			},
		},
		false //draw skeleton
	);
	new TennisBall(
		{
			x: 150,
			y: 400,
			d: 300,
			ballStyleSpec: {
				/**
				 * noise_size: 0.001,
				 * noise_radius: 0.01
				 *Esta combinacion hace efecto de velocidad
				 *
				 * Peloas locas: noise_size: random(0.1, 0.002), noise_radius: random(0.01, 0.002),
				 */
				noise_size: 0.002, // esto ordena o desordena los hilos, entre mas chico mas random - 0.001
				noise_radius: 0.002, //  esto hace los hilos mas grandes o mas chicos, entre mas chico mas largos - 0.002
				drawFrame: false,
				fillBackground: false,
			},
		},
		false //draw skeleton
	);

	new TennisBall(
		{
			x: 400,
			y: 250,
			d: 400,
			ballStyleSpec: {
				/**
				 * noise_size: 0.001,
				 * noise_radius: 0.01
				 *Esta combinacion hace efecto de velocidad
				 *
				 * Peloas locas: noise_size: random(0.1, 0.002), noise_radius: random(0.01, 0.002),
				 */
				noise_size: 0.002, // esto ordena o desordena los hilos, entre mas chico mas random - 0.001
				noise_radius: 0.002, //  esto hace los hilos mas grandes o mas chicos, entre mas chico mas largos - 0.002
				drawFrame: false,
				fillBackground: false,
			},
		},
		false //draw skeleton
	);
	new TennisBall(
		{
			x: 650,
			y: 250,
			d: 500,
			ballStyleSpec: {
				/**
				 * noise_size: 0.001,
				 * noise_radius: 0.01
				 *Esta combinacion hace efecto de velocidad
				 *
				 * Peloas locas: noise_size: random(0.1, 0.002), noise_radius: random(0.01, 0.002),
				 */
				noise_size: 0.002, // esto ordena o desordena los hilos, entre mas chico mas random - 0.001
				noise_radius: 0.002, //  esto hace los hilos mas grandes o mas chicos, entre mas chico mas largos - 0.002
				drawFrame: false,
				fillBackground: false,
			},
		},
		false //draw skeleton
	);
	new TennisBall(
		{
			x: 880,
			y: 430,
			d: 550,
			ballStyleSpec: {
				/**
				 * noise_size: 0.001,
				 * noise_radius: 0.01
				 *Esta combinacion hace efecto de velocidad
				 *
				 * Peloas locas: noise_size: random(0.1, 0.002), noise_radius: random(0.01, 0.002),
				 */
				noise_size: 0.002, // esto ordena o desordena los hilos, entre mas chico mas random - 0.001
				noise_radius: 0.002, //  esto hace los hilos mas grandes o mas chicos, entre mas chico mas largos - 0.002
				drawFrame: false,
				fillBackground: false,
			},
		},
		false //draw skeleton
	);
	new TennisBall(
		{
			x: 1000,
			y: 650,
			d: 700,
			ballStyleSpec: {
				/**
				 * noise_size: 0.001,
				 * noise_radius: 0.01
				 *Esta combinacion hace efecto de velocidad
				 *
				 * Peloas locas: noise_size: random(0.1, 0.002), noise_radius: random(0.01, 0.002),
				 */
				noise_size: 0.001, // esto ordena o desordena los hilos, entre mas chico mas random - 0.001
				noise_radius: 0.01, //  esto hace los hilos mas grandes o mas chicos, entre mas chico mas largos - 0.002
				drawFrame: false,
				fillBackground: true,
			},
		},
		false //draw skeleton
	);
}

function keyTyped() {
	if (key === "S") {
		saveCanvas("ball_" + random(1, 100000), "jpeg");
	}
}
