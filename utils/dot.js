class Dot {
	intentosDeSetear;
	padding;
	margenEntrePuntos;
	minRadioCircles;
	x_minOrigin;
	x_maxOrigin;
	y_minOrigin;
	y_maxOrigin;
	// Public
	x;
	y;
	r;
	active;

	constructor(allDots, configObject) {
		this.intentosDeSetear = configObject.intentosDeSetear;
		this.padding = configObject.padding;
		this.margenEntrePuntos = configObject.margenEntrePuntos;
		this.minRadioCircles = configObject.minRadioCircles;

		this.x_minOrigin = configObject.x_minOrigin;
		this.x_maxOrigin = configObject.x_maxOrigin;
		this.y_minOrigin = configObject.y_minOrigin;
		this.y_maxOrigin = configObject.y_maxOrigin;

		const config = this.getDotConfig(allDots);
		this.x = config.x;
		this.y = config.y;
		this.r = config.r;
		this.active = config.isActive;
	}

	getDotConfig(allDots) {
		const maxX = this.x_maxOrigin - this.padding;
		const minX = this.x_minOrigin + this.padding;
		const maxY = this.y_maxOrigin - this.padding;
		const minY = this.y_minOrigin + this.padding;
		const r = random(this.minRadioCircles, this.minRadioCircles * 2);

		let ready = true;
		for (let i = 0; i <= this.intentosDeSetear; i++) {
			const x = random(minX, maxX);
			const y = random(minY, maxY);
			allDots.forEach((item) => {
				if (
					abs(item.x - x) < r + item.r + this.margenEntrePuntos &&
					abs(item.y - y) < r + item.r + this.margenEntrePuntos
				) {
					ready = false;
				}
			});
			if (ready) {
				return { isActive: true, x, y, r };
			}
		}
		return { isActive: false, x: 0, y: 0, r };
	}

	// creation of a Dot.
	drawDots(fillDots = true) {
		noStroke();
		if (fillDots) {
			fill("rgba(255,255,255,0.5)");
		}
		circle(this.x, this.y, this.r);
	}
}
