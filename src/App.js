import React, { useState, useEffect, Component } from "react";
import Select from "react-select";
import fetchThis from "./utils/fetcher";

const App = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetchThis(setAllCountries);
  }, []);

  useEffect(() => {
    let newOptions = allCountries.map((el) => {
      const newElement = { value: el.name, label: el.name };
      return newElement;
    });
    setOptions(newOptions);
  }, [allCountries]);

  return (
    <div>
      <h1>World Bank App</h1>
      <Select options={options} />
    </div>
  );
};

export default App;
