export const formatNumber = (num) => {
  if (!num) return '0';

  const number = Number(num);
  
  if (isNaN(number)) return '0';

  const suffixes = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc'];
  const magnitude = Math.floor(Math.log10(Math.abs(number)) / 3);
  
  if (magnitude < 1) return number.toFixed(2);
  
  const scaled = number / Math.pow(1000, magnitude);
  
  return `${scaled.toFixed(2)}${suffixes[magnitude]}`;
}; 