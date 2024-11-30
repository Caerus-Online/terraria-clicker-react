export const formatNumber = (num) => {
  const suffixes = ['', 'k', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No', 'Dc', 'Ud', 'Dd', 'Td', 'Qad', 'Qu'];
  let suffixIndex = 0;
  
  while (num >= 1000 && suffixIndex < suffixes.length - 1) {
    num /= 1000;
    suffixIndex++;
  }
  
  return num.toFixed(1).replace(/\.0$/, '') + suffixes[suffixIndex];
}; 