import React, { useState, useEffect } from "react";
import fetchThis from "../../utils/fetcher";

const IndicatorPage = (props) => {
  const [api, setApi] = useState();

  /*
  Next tasks:
    1) Add charts
    2) Set up 404 page
  */

  useEffect(() => {
    async function fetchData() {
      const data = await fetchThis(`http://api.worldbank.org/v2/country/${props.match.params.country}/indicator/${props.match.params.indicatorId}?format=json`);
      setApi(data);
    }
    fetchData();
  }, []);

  /*
  props.match.params
    params:
      country: "chn"
      indicatorId: "SP.POP.TOTL"
  */

  return(
    <div>
      {api !== undefined && 
      <div>
        <p>ID of {api[2].country.id} and name of country {api[2].country.value}</p>
        <p>Date: {api[2].date}</p>
        <p>Name of indicator: {api[2].indicator.value}</p>
        <p>Value: {api[2].value}</p>
      </div>}
    </div>
  )
};

export default IndicatorPage;
