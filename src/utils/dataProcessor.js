import checkIfValid from "./requestValidityChecker";
import pageCounter from "./pageCounter";
import returnIndicatorName from "./returnIndicatorName";
import returnCountryName from "./returnCountryName";
import fetchMorePages from "./fetchMorePages";
import arrayProcessor from "./processArrays";
import dataFiller from "./dataFiller";

function processData(fetchedData, link, newColor) {
  const isValid = checkIfValid(fetchedData);
  if (isValid === false) return null;

  const pagesNumber = pageCounter(fetchedData);

  // From now on, we only want the second element of the array, which is the one that has values per year:
  fetchedData = fetchedData[1];

  const indicatorName = returnIndicatorName(fetchedData);

  const countryName = returnCountryName(fetchedData);

  fetchedData = fetchMorePages(fetchedData, link, pagesNumber);

  const [valuesArray, yearsArray] = arrayProcessor(fetchedData);

  // We select only the data that's going to be used in the chart:
  const countryDataset = dataFiller(countryName, valuesArray, newColor);

  return [indicatorName, yearsArray, countryDataset]
}

export default processData;