function u_flowBall_drawBall(x, y, diameter, spec) {
	push();
	const r = diameter / 2;
	translate(x - r, y - r);
	let flow_cell_size = 4; // 4
	let number_of_layers = 1; // 2 ideal para densidads
	let flow_l = diameter / flow_cell_size; // el tamaño del grid - 225*225
	const { noise_size, noise_radius, drawFrame, getColor } = spec;
	for (var i = 0; i < number_of_layers; i++) {
		let flow_grid = init_flow(flow_l, noise_size, noise_radius);
		display_flow(flow_grid, diameter, flow_cell_size, getColor);
	}
	if (drawFrame) {
		push();
		noFill();
		strokeWeight(1);
		stroke(0, 100, 50);
		rect(0, 0, diameter);
		pop();
	}
	pop();

	// ------ UTILS --------
	function init_flow(flow_l, noise_size, noise_radius) {
		const flow_grid = [];
		for (let i = 0; i < flow_l; i++) {
			let row = [];
			for (let j = 0; j < flow_l; j++) {
				row.push(calculate_flow(j * noise_size, i * noise_size, noise_radius));
			}
			flow_grid.push(row);
		}
		return flow_grid;
	}

	function calculate_flow(x, y, r) {
		let mean_arrow = createVector(0, 0);
		let radial_samples = 8; //8 numero ideal para ocnseguir un buen promedio de movimiento
		for (var i = 0; i < radial_samples; i++) {
			let angle = random(PI);
			let pos1 = createVector(x + cos(angle) * r, y + sin(angle) * r);
			let pos2 = createVector(x + cos(angle + PI) * r, y + sin(angle + PI) * r);

			let val1 = noise(pos1.x, pos1.y);
			let val2 = noise(pos2.x, pos2.y);

			let hilo = p5.Vector.sub(pos1, pos2)
				.normalize()
				.mult(val1 - val2);

			mean_arrow.add(hilo);
		}
		mean_arrow.div(radial_samples);
		return mean_arrow;
	}

	function display_flow(flow_grid, diameter, flow_cell_size, getColor) {
		for (let i = 0; i < flow_grid.length; i++) {
			for (let j = 0; j < flow_grid[i].length; j++) {
				if (
					inside_radius(
						i - flow_grid.length / 2,
						j - flow_grid[i].length / 2,
						(diameter / 2) * 0.24 //108
					)
				) {
					const x = j * flow_cell_size;
					const y = i * flow_cell_size;

					const ballColor = getColor(x, y);
					stroke(ballColor);
					strokeWeight(3);
					line(
						j * flow_cell_size,
						i * flow_cell_size,
						j * flow_cell_size + flow_grid[i][j].x * flow_cell_size * 1200,
						i * flow_cell_size + flow_grid[i][j].y * flow_cell_size * 1200
					);
				}
			}
		}
	}

	function inside_radius(x, y, r) {
		return sqrt(pow(x, 2) + pow(y, 2)) < r;
	}
}
