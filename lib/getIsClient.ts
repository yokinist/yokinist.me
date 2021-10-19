export const getIsClient = (): boolean => {
  return typeof window !== 'undefined';
};
