import fetchThis from "./fetcher";

function fetchMorePages(data, link, pagesNumber) {
    // Sometimes, there's more than one page of values fot the given country and indicator:
    if (pagesNumber > 1) {
        for (let i = 2; i <= pagesNumber; i++) {
            const newData = await fetchThis(link + `&page=${i}`);
            data.concat(newData[1]);
        }
        return data;
    }
}

export default fetchMorePages;