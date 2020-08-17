async function fetchThis(link) {
  const result = await fetch(link)
  let data = await result.json();
  if(data.length === 2) {
    data = data[1];
  }
  return data;
}

export default fetchThis;
