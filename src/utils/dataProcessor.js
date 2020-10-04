import fetchMorePages from "./fetchMorePages";
import arrayProcessor from "./processArrays";
import dataFiller from "./dataFiller";

/*
If there's no data, 0 pages of data or the fetched data has the property called "message",
it's an invalid request:
*/

function checkIfValid(data) {

  if (!data || data[0].page === 0 || "message" in data[0]) {
    return false;
  }
  return true;
}


async function processData(fetchedData, link, newColor, selectedItem) {
  try {
    const isValid = checkIfValid(fetchedData);
    if (!isValid) return null;
    // From now on, we only want the second element of the array, which is the one that has values per year:
    const pagesNumber = fetchedData[0].pages;
    let data = fetchedData[1];
    const indicatorName = data[0].indicator.value;
    const countryName = data[0].country.value;

    // Sometimes, there's more than one page of values fot the given country and indicator:
    if (pagesNumber > 1) {
      data = await fetchMorePages(data, link, pagesNumber);
    }

    const { valuesArray, yearsArray } = arrayProcessor(data);

    // We select only the data that's going to be used in the chart:
    const countryDataset = dataFiller(countryName, valuesArray, newColor);
    return { indicatorName, yearsArray, countryDataset };
  } catch (err) {
    console.log(err);
    return {};
  }
}

export default processData;