export const clamp = (value, min = 0, max = 1) => {
	if (min > max) {
		[min, max] = [max, min];
	}

	return Math.max(min, Math.min(max, value));
};

export const normalize = (
	number,
	currentScaleMin,
	currentScaleMax,
	newScaleMin = 0,
	newScaleMax = 1,
) => {
	const standardNormalization =
		(number - currentScaleMin) / (currentScaleMax - currentScaleMin);

	return (newScaleMax - newScaleMin) * standardNormalization + newScaleMin;
};

export const clampedNormalize = (
	value,
	currentScaleMin,
	currentScaleMax,
	newScaleMin = 0,
	newScaleMax = 1,
) => {
	return clamp(
		normalize(
			value,
			currentScaleMin,
			currentScaleMax,
			newScaleMin,
			newScaleMax,
		),
		newScaleMin,
		newScaleMax,
	);
};

export function getDistanceBetweenPoints(p1, p2) {
	const deltaX = p1.x - p2.x;
	const deltaY = p1.y - p2.y;

	return Math.sqrt(deltaX ** 2 + deltaY ** 2);
}

export const convertDegreesToRadians = (angle) => (angle * Math.PI) / 180;
export const convertRadiansToDegrees = (angle) => (angle * 180) / Math.PI;

export const convertPolarToCartesian = (angle, distance) => {
	const angleInRadians = convertDegreesToRadians(angle);

	const x = Math.cos(angleInRadians) * distance;
	const y = Math.sin(angleInRadians) * distance;

	return [x, y];
};

export const convertCartesianToPolar = (x, y) => {
	let angle = convertRadiansToDegrees(Math.atan2(y, x));

	if (angle < 0) {
		angle += 360;
	}

	const distance = Math.sqrt(x ** 2 + y ** 2);

	return [angle, distance];
};
