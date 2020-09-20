/*
If there's no data, 0 pages of data or the fetched data has the property called "message",
it's an invalid request:
*/

function checkIfValid(data) {
  if (!data || data[0].page === 0 || "message" in data[0]) {
    return false;
  }
  return true;
}

export default checkIfValid;