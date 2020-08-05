import React, { useState } from "react";

const Searcher = (props) => {
  const [value, setValue] = useState("");

  function handleChange(e) {
    setValue(e.target.value);
    console.log(props.countries);
  }

  function handleForm(e) {
    e.preventDefault();
    setValue("");
    fetch("https://restcountries.eu/rest/v2/all")
      .then((data) => data.json())
      .then((data) => props.setCountries(data))
      .catch(function (error) {
        console.log(error); // Error!
      });
  }

  return (
    <form onSubmit={handleForm}>
      <input onChange={handleChange} value={value}></input>
      <button>Search</button>
    </form>
  );
};

export default Searcher;