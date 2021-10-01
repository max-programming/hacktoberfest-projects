const capFirstLetter = (str: string) => {
    return str.replace(/(^|\s)\S/g, letter => letter.toUpperCase());
};

export default capFirstLetter;
