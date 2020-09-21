function storeSelectedCountries(allIDs, filteredOptions) {
  const newSelected = allIDs.map((chosenID) => {
    const newCountry = filteredOptions.find((option) => option.id === chosenID);
    return newCountry;
  });
  return newSelected;
}

export default storeSelectedCountries;
