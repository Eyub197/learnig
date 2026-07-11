export const normalize = (
  number,
  currentScaleMin,
  currentScaleMax,
  newScaleMin = 0,
  newScaleMax = 1
) => {
  // First, normalize the value between 0 and 1.
  const standardNormalization =
    (number - currentScaleMin) / (currentScaleMax - currentScaleMin);

  // Next, transpose that value to our desired scale.
  return (
    (newScaleMax - newScaleMin) * standardNormalization + newScaleMin
  );
};

export const clamp = (
  val,
  min = 0,
  max = 1
) => {
  if (min > max) {
    [min, max] = [max, min];
  }

  return Math.max(min, Math.min(max, val));
};