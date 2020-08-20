import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { Line } from 'react-chartjs-2';
import FourOhFour from "../../components/FourOhFour/index.js";
import fetchThis from "../../utils/fetcher";

const CountryName = styled.h2`
  color: blue;
  font-familiy: Arial;
  display: flex;
  justify-content: center;
  margin-bottom: 3 rem;
`
const IndicatorPage = (props) => {
  const [countryName, setCountryName] = useState()
  const [data, setData] = useState();

  useEffect(() => {
    async function fetchData() {
      const fetchedData = await fetchThis(`http://api.worldbank.org/v2/country/${props.match.params.country}/indicator/${props.match.params.indicatorId}?format=json`);
      if(fetchedData === undefined) {
        return;
      }
      setCountryName(fetchedData[0]);
      setData(fetchedData[1]);
    }
    fetchData();
  }, [props]);

  return(
    <div>
      {data !== undefined && 
      <div>
        <CountryName>{countryName}</CountryName>
        <Line
          data={data}
          width={100}
          height={800}
          options={{ maintainAspectRatio: false }}
        />
      </div>}
      {data === undefined && <h2>Loading...</h2>}
    </div>
  )
};

export default IndicatorPage;
