import React, { useState, useEffect } from "react";
import { Line } from 'react-chartjs-2';
import fetchThis from "../../utils/fetcher";

const IndicatorPage = (props) => {
  const [data, setData] = useState();

  /*
  Next tasks:
    1) Add charts
    2) Set up 404 page
  */

  // Possible solution: complete data object. There may be missing properties.

  useEffect(() => {
    async function fetchData() {
      const fetchedData = await fetchThis(`http://api.worldbank.org/v2/country/${props.match.params.country}/indicator/${props.match.params.indicatorId}?format=json`);
      setData(fetchedData);
    }
    fetchData();
  }, []);

  console.log(data)

  /*
  props.match.params
    params:
      country: "chn"
      indicatorId: "SP.POP.TOTL"
  */


  return(
    <div>
      {data !== undefined && 
      <div>
        <Line
          data={data}
          width={100}
          height={50}
          options={{ maintainAspectRatio: false }}
        />
      </div>}
    </div>
  )
};

export default IndicatorPage;
