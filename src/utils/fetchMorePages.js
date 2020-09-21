import fetchThis from "./fetcher";

async function fetchMorePages(data, link, pagesNumber) {
  for (let i = 2; i <= pagesNumber; i++) {
    const newData = await fetchThis(link + `&page=${i}`);
    data.concat(newData[1]);
  }
  return data;
}

export default fetchMorePages;