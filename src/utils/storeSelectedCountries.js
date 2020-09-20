function storeSelectedCountries(allIDs, filteredOptions) {
  const newSelected = allIDs.map((chosenID) => {
    return filteredOptions.find((option) => option.id === chosenID);
  });
  return newSelected;
}

export default storeSelectedCountries;
