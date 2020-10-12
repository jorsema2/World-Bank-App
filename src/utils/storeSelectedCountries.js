function storeSelectedCountries(chosenIDs, countries) {
  const newSelected = chosenIDs.map((chosenID) => {
    return countries.find((country) => country.id === chosenID);
  });
  return newSelected;
}

export default storeSelectedCountries;
