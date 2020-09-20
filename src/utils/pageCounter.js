function pageCounter(data) {
  // Number of JSON pages this data has:
  const pagesNumber = data[0].pages;
  return pagesNumber;
}

export default pageCounter;
