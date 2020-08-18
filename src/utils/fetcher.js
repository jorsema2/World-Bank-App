async function fetchThis(link) {
  const result = await fetch(link);
  let data = await result.json();
  if(data.length === 2) {
    data = data[1];
  }
  return data;
}

// Create one fetching file for API and move baseURL to the fetching file if possible and convenient

export default fetchThis;
