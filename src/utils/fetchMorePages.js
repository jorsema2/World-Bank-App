import getData from "./getData";

async function fetchMorePages(data, link, pagesNumber) {
  const nextData = [...data]
  for (let i = 2; i <= pagesNumber; i++) {
    const newData = await getData(link + `&page=${i}`);
   
    nextData.push(...newData[1]);
  }
  return nextData;
}

export default fetchMorePages;