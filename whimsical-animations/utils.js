export function random(min, max) {
	return Math.random() * (max - min) + min;
}

function convertDegreesToRadians(angle) {
	return (angle * Math.PI) / 180;
}

export function convertPolarToCartesian(angle, distance) {
	const angleInRadians = convertDegreesToRadians(angle);
	const x = Math.cos(angleInRadians) * distance;
	const y = Math.sin(angleInRadians) * distance;

	return [x, y];
}

export function normalize(
	number,
	currentSclaeMin,
	currentSclaeMax,
	newScaleMin = 0,
	newScaleMax = 1,
) {
	const standartNomralizatoin =
		(number - currentSclaeMin) / (currentSclaeMax - currentSclaeMin);

	return (newScaleMax - newScaleMin) * standartNomralizatoin + newScaleMin;
}
