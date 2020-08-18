import React, { useState, useEffect } from "react";
import Select from "react-select";
import IndicatorsList from '../../components/IndicatorsList/index.js';
import fetchThis from "../../utils/fetcher";

const Home = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [options, setOptions] = useState([]);
  const [chosenCountry, setChosenCountry] = useState();
  const [indicators, setIndicators] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchThis("https://restcountries.eu/rest/v2/all");
      setAllCountries(data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const newOptions = allCountries.map((el) => {
      const newElement = { value: el.name, id: el.alpha3Code, label: el.name };
      return newElement;
    });
    setOptions(newOptions);
  }, [allCountries]);

  function handleChange(e) {
    setPage(1);
    setIndicators([]);
    const selectedValue = options.find(obj => obj.value === e.value)
    setChosenCountry(selectedValue);
  }
  
  return (
    <div>
      <h1>World Bank App</h1>
      <Select value={chosenCountry} options={options} onChange={handleChange} />
      {chosenCountry !== undefined && <IndicatorsList chosenCountry={chosenCountry} indicators={indicators} setIndicators={setIndicators} page={page} setPage={setPage} />}
    </div>
  );
};

export default Home;
