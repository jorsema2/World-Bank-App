function storeSelectedCountries(ids, options) {
  const newSelected = ids.map((chosenID) => {
    return options.find((option) => option.id === chosenID);
  });
  
  return newSelected;
}

export default storeSelectedCountries;

