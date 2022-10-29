const sortByName = (a: string, b: string): number => {
  const lowerA = a.toLowerCase();
  const lowerB = b.toLowerCase();

  if (lowerA < lowerB) return -1;
  if (lowerA > lowerB) return 1;

  // names must be equal
  return 0;
};

export default sortByName;
