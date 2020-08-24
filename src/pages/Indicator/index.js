import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { Line } from 'react-chartjs-2';
import Select from "react-select";
import FourOhFour from "../../components/FourOhFour/index.js";
import fetchThis from "../../utils/fetcher";
import { OptionsContext } from "../Home/index.js"

const CountryName = styled.h2`
  color: blue;
  font-familiy: Arial;
  display: flex;
  justify-content: center;
  margin-bottom: 3 rem;
`

const IndicatorPage = (props) => {
  const [loading, setLoading] = useState(true);
  const [countryNames, setCountryNames] = useState([]);
  const [data, setData] = useState();
  const [additionalCountries, setAdditionalCountries] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const fetchedData = await fetchThis(
        `http://api.worldbank.org/v2/country/${props.match.params.country}/indicator/${props.match.params.indicatorId}?format=json`
      );
      if (fetchedData === undefined) {
        setLoading(false);
        return;
      }
      setCountryNames(fetchedData[0]);
      setData(fetchedData[1]);
      setLoading(false);
    }
    fetchData();
  }, [props]);

  function handleChange(e) {
    const selectedValue = props.options.find(obj => obj.value === e.value)
    setAdditionalCountries([...additionalCountries, selectedValue]);

  }

  return (
    <div>
      {loading === true && <h1>Loading...</h1>}
      {data !== undefined && loading === false && (
        <div>
          <CountryName>{countryNames}</CountryName>
          <Line
            data={data}
            width={100}
            height={100}
            options={{ maintainAspectRatio: false }}
          />
          <p>Add another country to the chart</p>
          <OptionsContext.Consumer>
            {(options) => <Select options={options}/>}
          </OptionsContext.Consumer>
        </div>
      )}
      {data === undefined && loading === false && <FourOhFour />}
    </div>
  );
};

export default IndicatorPage;
