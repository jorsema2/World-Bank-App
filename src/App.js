import React, { useState, useEffect } from "react";
import List from './components/List';
import Select from "react-select";
import fetchThis from "./utils/fetcher";

const App = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [options, setOptions] = useState([]);
  const [chosenCountry, setChosenCountry] = useState({});
  const [indicators, setIndicators] = useState([]);

  useEffect(() => {
    fetchThis(setAllCountries, "https://restcountries.eu/rest/v2/all");
    fetchThis(setIndicators, "http://api.worldbank.org/v2/indicator?format=json&page=1");
  }, []);

  useEffect(() => {
    const newOptions = allCountries.map((el) => {
      const newElement = { value: el.name, id: el.alpha3Code, label: el.name };
      return newElement;
    });
    setOptions(newOptions);
  }, [allCountries]);

  useEffect(() => {
    const chosenIndicators = indicators.map((el) => {
      const newElement = { name: el.name, id: el.id, description: el.sourceNote }
      return newElement;
    })
    setIndicators(chosenIndicators);
  }, [chosenCountry]);  

  // Add later: {Object.keys(chosenCountry).length !== 0 && <List  />}
  
  return (
    <div>
      <h1>World Bank App</h1>
      <Select options={options} onChange={setChosenCountry} />
      <List />      
    </div>
  );
};

export default App;
