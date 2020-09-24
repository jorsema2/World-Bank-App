function storeSelectedCountries(ids, options) {
  console.log(ids, options)
  const newSelected = ids.map((chosenID) => {
    return options.find((option) => option.id === chosenID);
  });
  
  return newSelected;
}

export default storeSelectedCountries;

