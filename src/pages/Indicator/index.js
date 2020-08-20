import React, { useState, useEffect } from "react";
import { Line } from 'react-chartjs-2';
import FourOhFour from "../../components/FourOhFour/index.js"
import fetchThis from "../../utils/fetcher";

const IndicatorPage = (props) => {
  const [countryName, setCountryName] = useState()
  const [data, setData] = useState();

  useEffect(() => {
    async function fetchData() {
      const fetchedData = await fetchThis(`http://api.worldbank.org/v2/country/${props.match.params.country}/indicator/${props.match.params.indicatorId}?format=json`);
      if(fetchedData === undefined) {
        return;
      }
      setCountryName(fetchedData[0])
      setData(fetchedData[1]);
    }
    fetchData();
  }, [props]);

  return(
    <div>
      {data !== undefined && 
      <div>
        <h3>{countryName}</h3>
        <Line
          data={data}
          width={100}
          height={800}
          options={{ maintainAspectRatio: false }}
        />
      </div>}
      {data === undefined && <FourOhFour />}
    </div>
  )
};

export default IndicatorPage;
