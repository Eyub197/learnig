export function setupCanvas(canvas) {
  const ctx = canvas.getContext('2d');

  const canvasDimensions = {}

  function update() {
    const dpr = window.devicePixelRatio;
    const { width, height } = canvas.getBoundingClientRect();

    canvas.setAttribute('width', width * dpr);
    canvas.setAttribute('height', height * dpr);

    ctx.scale(dpr, dpr);

    canvasDimensions.width = width;
    canvasDimensions.height = height;
  }

  update();

  window.addEventListener('resize', update);

  return { ctx, canvasDimensions };
}

export const convertDegreesToRadians = (angle) => (angle * Math.PI) / 180;

export const convertPolarToCartesian = (angle, distance) => {
  const angleInRadians = convertDegreesToRadians(angle);
  const x = Math.cos(angleInRadians) * distance;
  const y = Math.sin(angleInRadians) * distance;

  return [x, y];
};

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

export function checkPrefersReducedMotion() {
  return !window.matchMedia(
    '(prefers-reduced-motion: no-preference)'
  ).matches;
}