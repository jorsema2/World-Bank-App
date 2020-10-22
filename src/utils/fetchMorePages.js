import fetchData from "./fetchData";

async function fetchMorePages(data, link, pagesNumber) {
  const nextData = [...data]
  for (let i = 2; i <= pagesNumber; i++) {
    const newData = await fetchData(link + `&page=${i}`);
   
    nextData.push(...newData[1]);
  }
  return nextData;
}

export default fetchMorePages;