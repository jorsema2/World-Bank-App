function fetchThis(setter, link) {
  fetch(link)
    .then((data) => data.json())
    .then((data) => {
      if(data.length === 2) {
        data = data[1];
      }
      setter(data)})
    .catch(function (error) {
      console.log(error); // Error!
    });
}

export default fetchThis;
