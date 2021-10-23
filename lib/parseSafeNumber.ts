const NUMBER_PATTERN = /^[0-9]+$/;

export const parseSafeNumber = (val?: unknown) => {
  if (typeof val !== 'string' || !new RegExp(NUMBER_PATTERN).test(val)) return null;
  return Number(val);
};
