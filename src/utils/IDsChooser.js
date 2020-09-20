function chooseIDs(IDsInString) {
  // Convert IDs from query string to an array of IDs:
  let arrayIDs = IDsInString.split(",");

  // Remove duplicates:
  arrayIDs = Array.from(new Set(arrayIDs));

  // Since we only want to allow 3 countries for comparison:
  return chosenIDs = arrayIDs.slice(0, 3);
}

export default chooseIDs;
