export const capitalizeString = (str: string) => {
  return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
};

export const humanizeString = (str: string) => {
  return str.split('_').map(capitalizeString).join(' ');
};

export const formatCurrency = (value: number, currency = '$') => {
  const roundedValue = Math.round(value * 100) / 100;

  return `${currency}${roundedValue.toFixed(2)}`;
};

export const uniqueId = (prefix = 'id-') =>
  prefix + Math.random().toString(16).slice(-4);
