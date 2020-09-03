import fetchThis from "./fetcher";

// Gets the options (countries) for the Select component
async function fetchOptions() {
  const data = await fetchThis("https://restcountries.eu/rest/v2/all");
  // Create a list of all countries that will be shown:
  const newOptions = data.map((el) => {
    const newElement = { value: el.name, id: el.alpha3Code, label: el.name };
    return newElement;
  });
  return newOptions;
}

export default fetchOptions;
