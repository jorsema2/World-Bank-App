import getData from "./getData";

async function getCountries() {
  const data = await getData("https://restcountries.eu/rest/v2/all");

  const newCountries = data.map((el) => {
    const newElement = { value: el.name, id: el.alpha3Code, label: el.name, isDisabled: false };
    return newElement;
  });
  return newCountries;
}

export default getCountries;
