export const dateTransform = (date: string): string => {
  if (!date) {
    return '';
  }
  return new Date(date).toISOString().slice(0, 10);
};
