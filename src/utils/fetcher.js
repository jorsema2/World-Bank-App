function fetchThis(props) {
    fetch("https://restcountries.eu/rest/v2/all")
      .then((data) => data.json())
      .then((data) => props.setCountries(data))
      .catch(function (error) {
        console.log(error); // Error!
    });
}

export default fetchThis;