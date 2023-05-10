const capFirstLetter = (str: string) => {
  return decodeURIComponent(str).replace(/(^|\s)\S/g, letter =>
    letter.toUpperCase()
  );
};

export default capFirstLetter;
