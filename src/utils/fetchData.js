async function fetchData(link) {
  try {
    const result = await fetch(link);
    const data = await result.json();
    return data;
  } catch {
    return null;
  }
}

export default fetchData;
