import dataFiller from './dataFiller';

async function fetchThis(link) {
  const result = await fetch(link);
  let data = await result.json();
  const pagesNumber = data[0].pages;
  if(data.length === 2) {
    data = data[1];
  }
  if(link.includes('country')) {
    if(pagesNumber > 1) {
      for(let i = 2; i <= pagesNumber; i++){
        const result = await fetch(link + `&page=${i}`);
        const newData = await result.json();
        data = data.concat(newData[1]);
      }
    }
    const processedData = dataFiller(data);
    data = processedData;
  }
  return data;
}

// Create one fetching file for each API and move baseURL to the fetching file if possible and convenient

export default fetchThis;