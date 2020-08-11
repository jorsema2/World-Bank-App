function fetchThis(setAllCountries) {
  fetch("https://restcountries.eu/rest/v2/all")
    .then((data) => data.json())
    .then((data) => setAllCountries(data))
    .catch(function (error) {
      console.log(error); // Error!
    });
}

export default fetchThis;
