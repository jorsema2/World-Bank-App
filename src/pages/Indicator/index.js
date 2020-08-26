import React, { useState, useEffect, useContext } from "react";
import styled from 'styled-components';
import { Line } from 'react-chartjs-2';
import Select from "react-select";
import fetchThis from "../../utils/fetcher";
import dataFiller from "../../utils/dataFiller";
import { SmartContext } from "../../App";

const CountryName = styled.h2`
  color: blue;
  font-familiy: Arial;
  display: flex;
  justify-content: center;
  margin-bottom: 3 rem;
`

const IndicatorPage = (props) => {
  const {options} = useContext(SmartContext);
  const [loading, setLoading] = useState(true);
  const [countryNames, setCountryNames] = useState([]);
  const [data, setData] = useState();
  const [additionalCountries, setAdditionalCountries] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const link = `http://api.worldbank.org/v2/country/${props.match.params.country}/indicator/${props.match.params.indicatorId}?format=json`;
      let fetchedData = await fetchThis(link);

      if (!fetchedData || fetchedData[0].page === 0) {
        setLoading(false);
        return;
      }

      // Number of JSON pages this data has:
      const pagesNumber = fetchedData[0].pages;

      // We only want the second element of the array, which is the one that has values per year:
      fetchedData = fetchedData[1];

      // Sometimes, there's more than one page of values fot the given country and indicator:
      if(pagesNumber > 1) {
        for(let i = 2; i <= pagesNumber; i++){
          const newData = await fetchThis(link + `&page=${i}`);
          fetchedData = fetchedData.concat(newData[1]);
        }
      }

      // We select only the data that's going to be used in the chart:
      const processedData = dataFiller(fetchedData);

      setCountryNames(processedData[0]);
      setData(processedData[1]);
      setLoading(false);
    }
    fetchData();
  }, [props]);

  useEffect(() => {
    if(!data && !loading){
      props.history.push('/not-found')
    }
  }, [data, loading, props])

  function handleChange(e) {
    const selectedValue = options.find(obj => obj.value === e.value);
    setAdditionalCountries([...additionalCountries, selectedValue]);
  }

  return (
    <div>
      {loading && <h1>Loading...</h1>}
      {data && !loading && (
        <div>
          <CountryName>{countryNames}</CountryName>
          <Line
            data={data}
            width={100}
            height={100}
            options={{ maintainAspectRatio: false }}
          />
          <p>Add another country to the chart</p>
          <Select options={options} />
        </div>
      )}
    </div>
  );
};

export default IndicatorPage;
