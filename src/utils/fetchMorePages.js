import fetchThis from "./fetcher";

async function fetchMorePages(data, link, pagesNumber) {
  const nextData = [...data]
  for (let i = 2; i <= pagesNumber; i++) {
    const newData = await fetchThis(link + `&page=${i}`);
   
    nextData.push(...newData[1]);
  }
  return nextData;
}

export default fetchMorePages;