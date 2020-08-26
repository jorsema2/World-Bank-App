async function fetchThis(link) {
  const result = await fetch(link);
  const data = await result.json();
  return data;
}

// Create one fetching file for each API and move baseURL to the fetching file if possible and convenient

export default fetchThis;