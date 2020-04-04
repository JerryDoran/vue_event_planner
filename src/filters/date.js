export default (value) => {
  const date = value;

  if (!date) return null;

  const [year, month, day] = date.split('-');
  return `${month}/${day}/${year}`;
};
