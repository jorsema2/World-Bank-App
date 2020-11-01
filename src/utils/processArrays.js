function processArrays(data) {
  const newData = data.map((el) => ({ x:el.date, y:el.value})).reverse();
  return newData;
}

export default processArrays;