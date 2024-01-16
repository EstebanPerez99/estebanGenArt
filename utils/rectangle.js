class Rectangle {
	intentosDeSetear = 300;
	paddingX = 0;
	paddingY = 0;
	margen = random(-20, -10);
	frameSize;
	// Public
	x;
	y;
	w;
	h;
	active;

	constructor(elements, frameSize) {
		// this.padding = configObject.padding;
		// this.margenEntrePuntos = configObject.margenEntrePuntos;
		// this.minRadioCircles = configObject.minRadioCircles;
		this.frameSize = frameSize;
		const config = this.getRectConfig(elements);
		this.x = config.x;
		this.y = config.y;
		this.w = config.w;
		this.h = config.h;
		this.active = config.isActive;
	}

	getRectConfig(elements) {
		this.canvasW = width - this.frameSize * 2;
		this.canvasH = height - this.frameSize * 2;
		this.paddingX = this.canvasW * 0.1;
		this.paddingY = this.canvasH * 0.1;
		const maxX = width - this.frameSize - this.paddingX;
		const minX = this.frameSize + this.paddingX;
		const maxY = height - this.frameSize - this.paddingY;
		const minY = this.frameSize + this.paddingY;

		let ready = true;
		for (let i = 0; i <= this.intentosDeSetear; i++) {
			const x = random(minX, maxX);
			const y = random(minY, maxY);
			let upperBoundW;
			let lowerBoundW;
			if (x - minX > maxX - x) {
				upperBoundW = maxX - x;
				if (maxX - x < this.canvasW * 0.5) {
					lowerBoundW = maxX - x;
				} else {
					lowerBoundW = this.canvasW * 0.5;
				}
			} else {
				upperBoundW = x - minX;
				if (x - minX < this.canvasW * 0.5) {
					lowerBoundW = x - minX;
				} else {
					lowerBoundW = this.canvasW * 0.5;
				}
			}
			const w = random(lowerBoundW, upperBoundW);
			// console.log({ lowerBoundW, upperBoundW, w });

			let upperBoundH;
			let lowerBoundH;
			if (y - minY > maxY - y) {
				upperBoundH = maxY - y;
				if (maxY - y < this.canvasH * 0.5) {
					lowerBoundH = maxY - y;
				} else {
					lowerBoundH = this.canvasH * 0.5;
				}
			} else {
				upperBoundH = y - minY;
				if (y - minY < this.canvasH * 0.5) {
					lowerBoundH = y - minY;
				} else {
					lowerBoundH = this.canvasH * 0.5;
				}
			}
			const h = random(lowerBoundH, upperBoundH);
			// console.log({ lowerBoundH, upperBoundH, h, canvasH: this.canvasH });
			elements.forEach((item) => {
				if (
					abs(item.x - x) < w / 2 + item.w / 2 + this.margen &&
					abs(item.y - y) < h / 2 + item.h / 2 + this.margen
				) {
					ready = false;
				}
			});
			if (w < 50 || h < 50) {
				ready = false;
			}
			if (ready) {
				return { isActive: true, x, y, w, h };
			}
		}
		return { isActive: false, x: 0, y: 0, w: 0, h: 0 };
	}

	// creation of a Dot.
	drawRect(fill = false) {
		strokeWeight(10);
		stroke(237, 34, 93);
		if (fill) {
			fill(0);
		}
		rect(this.x, this.y, this.w, this.h);
		// circle(this.x, this.y, 10);
	}
}
