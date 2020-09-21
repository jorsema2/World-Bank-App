function returnCountryName(data) {
  // Name of the new country:
  const countryName = data[0].country.value;
  return countryName;
}

export default returnCountryName;