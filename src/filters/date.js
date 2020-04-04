export default (value) => {
  const date = value;
  // return date.toLocaleString(['en-US'], {
  //   month: 'short',
  //   day: '2-digit',
  //   year: 'numeric'
  //   // hour: '2-digit',
  //   // minute: '2-digit'
  // });

  if (!date) return null;

  const [year, month, day] = date.split('-');
  return `${month}/${day}/${year}`;
};
