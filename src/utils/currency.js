export const formatSom = (amount) => {
  const num =
    typeof amount === 'number'
      ? amount
      : Number.isNaN(Number(amount))
      ? 0
      : Number(amount);

  const rounded = Math.round(num || 0);
  return `${rounded} сом`;
};


