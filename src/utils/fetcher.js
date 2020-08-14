function fetchThis(setter, link) {
  fetch(link)
    .then((data) => data.json())
    .then((data) => {
      /* We need to get rid off the first element of the Indicators array 
      since the array of indicators is, indeed, only the second element of the array:
      */
      if(data.length === 2) {
        data = data[1];
      }
      setter(data)})
    .catch(function (error) {
      console.log(error); // Error!
    });
}

export default fetchThis;
