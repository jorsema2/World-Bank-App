import getData from "./getData";

async function fetchData(countryID, indicator) {
    const link = `http://api.worldbank.org/v2/country/${countryID}/indicator/${indicator}?format=json`;
    const fetchedData = await getData(link);
    return {fetchedData, link};
}

export default fetchData;