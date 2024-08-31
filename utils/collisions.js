/**
 * Para que estas funciones de colición funcionen debemos tener rectMode(CENTER);
 */
const u_isInsideRectangle_CENTER = (x, y, spec) => {
	const halfWidth = spec.width / 2;
	const halfHeight = spec.height / 2;
	const translatedRx = spec.rx - halfWidth;
	const translatedRy = spec.ry - halfHeight;
	if (
		x >= translatedRx && // right of the left edge AND
		x <= translatedRx + spec.width && // left of the right edge AND
		y >= translatedRy && // below the top AND
		y <= translatedRy + spec.height // above the bottom
	) {
		return true;
	}
	return false;
};

const u_isInsideHollowRectangle_CENTER = (x, y, spec1, spec2) => {
	if (
		u_isInsideRectangle_CENTER(x, y, spec1) &&
		!u_isInsideRectangle_CENTER(x, y, spec2)
	) {
		return true;
	}
	return false;
};

/**
 * Para que estas funciones de colición funcionen debemos tener rectMode(CORNER) -> (opción default);
 */
const u_isInsideRectangle_CORNER = (x, y, spec) => {
	if (
		x >= spec.rx && // right of the left edge AND
		x <= spec.rx + spec.width && // left of the right edge AND
		y >= spec.ry && // below the top AND
		y <= spec.ry + spec.height // above the bottom
	) {
		return true;
	}
	return false;
};

// spec 1 es el rect grande
const u_isInsideHollowRectangle_CORNER = (x, y, spec1, spec2) => {
	if (
		u_isInsideRectangle_CORNER(x, y, spec1) &&
		!u_isInsideRectangle_CORNER(x, y, spec2)
	) {
		return true;
	}
	return false;
};

const u_isInsideCircle = (x, y, spec) => {
	const r = spec.diameter / 2;
	const distX = x - spec.cx;
	const distY = y - spec.cy;
	const distance = sqrt(distX * distX + distY * distY);

	if (distance <= r) {
		return true;
	}
	return false;
};

// spec 1 es el circulo grande
const u_isInsideHollowCircle = (x, y, spec1, spec2) => {
	if (u_isInsideCircle(x, y, spec1) && !u_isInsideCircle(x, y, spec2)) {
		return true;
	}
	return false;
};
