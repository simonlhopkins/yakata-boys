/**
 * Clamps a number between a minimum and maximum value.
 *
 * @param value - The number to clamp.
 * @param min - The minimum value.
 * @param max - The maximum value.
 * @returns The clamped value.
 */
function clamp(value: number, min: number, max: number): number {
  if (min > max) {
    throw new Error("The min value should not be greater than the max value.");
  }
  return Math.max(min, Math.min(max, value));
}

/**
 * Map a value from one range to another linearly.
 * @param value The value to map.
 * @param inMin The minimum value of the input range.
 * @param inMax The maximum value of the input range.
 * @param outMin The minimum value of the output range.
 * @param outMax The maximum value of the output range.
 * @returns The mapped value.
 */
const mapRange = (
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number => {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};

/**
 * Smoothstep function for smooth interpolation.
 * @param t - Progress value (0 to 1).
 * @returns Smoothed progress value.
 */
function smoothstep(t: number): number {
  return t * t * (3 - 2 * t);
}

export { clamp, mapRange, smoothstep };
