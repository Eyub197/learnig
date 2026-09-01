export function setupCanvas(canvas) {
  const dpr = window.devicePixelRatio;
  const { width, height } =
    canvas.getBoundingClientRect();

  canvas.setAttribute('width', width * dpr);
  canvas.setAttribute('height', height * dpr);

  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);

  return { ctx, canvasWidth: width, canvasHeight: height };
}

export const normalize = (
  number,
  currentScaleMin,
  currentScaleMax,
  newScaleMin = 0,
  newScaleMax = 1
) => {
  const standardNormalization =
    (number - currentScaleMin) / (currentScaleMax - currentScaleMin);

  return (newScaleMax - newScaleMin) * standardNormalization + newScaleMin;
};

export const clamp = (
  value,
  min = 0,
  max = 1
) => {
  if (min > max) {
    [min, max] = [max, min];
  }

  return Math.max(min, Math.min(max, value));
};

export const clampedNormalize = (
  value,
  currentScaleMin,
  currentScaleMax,
  newScaleMin = 0,
  newScaleMax = 1
) => {
  return clamp(
    normalize(
      value,
      currentScaleMin,
      currentScaleMax,
      newScaleMin,
      newScaleMax
    ),
    newScaleMin,
    newScaleMax
  );
};