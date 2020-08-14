import React, { useState, useEffect } from "react";
import List from './components/List';
import Select from "react-select";
import fetchThis from "./utils/fetcher";

const App = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [options, setOptions] = useState([]);
  const [chosenCountry, setChosenCountry] = useState({});

  useEffect(() => {
    fetchThis(setAllCountries, "https://restcountries.eu/rest/v2/all");
  }, []);

  useEffect(() => {
    const newOptions = allCountries.map((el) => {
      const newElement = { value: el.name, id: el.alpha3Code, label: el.name };
      return newElement;
    });
    setOptions(newOptions);
  }, [allCountries]);

  // Find how to show the whole object of the chosen country because we need ID!!!

  function handleChange(e) {
    options.filter(obj => obj.value === e.value)
    console.log(e.value);
  }
  
  return (
    <div>
      <h1>World Bank App</h1>
      <Select value={options.filter(obj => obj.value === chosenCountry)} options={options} onChange={handleChange} />
      <List chosenCountry={chosenCountry} />
    </div>
  );
};

export default App;
