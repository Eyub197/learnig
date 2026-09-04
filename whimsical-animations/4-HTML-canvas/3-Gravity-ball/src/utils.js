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

export function checkPrefersReducedMotion() {
  return !window.matchMedia(
    '(prefers-reduced-motion: no-preference)'
  ).matches;
}