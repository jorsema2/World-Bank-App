import React, {useState, useEffect, useContext} from "react";
import styled from "styled-components";
import {Line} from "react-chartjs-2";
import queryString from "query-string";
import Select from "react-select";
import fetchThis from "../../utils/fetcher";
import dataFiller from "../../utils/dataFiller";
import fetchOptions from "../../utils/fetchCountries";
import {SmartContext} from "../../App";

const IndicatorName = styled.h2`
  color: blue;
  font-familiy: Arial;
  display: flex;
  justify-content: center;
  margin-bottom: 3 rem;
`;

const ChartPage = (props) => {
  const { options, setOptions, state, dispatch } = useContext(SmartContext);
  const [isDisabled, setIsDisabled] = useState(false);
  const [indicatorName, setIndicatorName] = useState();
  const [datasets, setDatasets] = useState([]);
  const [lineColors, setLineColors] = useState([
    "rgba(255, 0, 0, 0.8)",
    "rgba(0, 255, 0, 0.8)",
    "rgba(0, 0, 255, 0.8)",
    "rgba(255, 255, 0, 0.8)",
  ]);

  const search = queryString.parse(props.location.search);

  /*
  We need to fetch options also in this file in case the user comes here using a link 
  instead of navigating the web app
  */
  useEffect(() => {
    async function addOptions() {
      const newOptions = await fetchOptions();
      setOptions(newOptions);
    }
    addOptions();
  }, []);

  // Variable that will store years that will be shown in the chart as labels:
  let years;

  async function addData(fetchedData, link) {
    if (!fetchedData || fetchedData[0].page === 0) {
      dispatch({ type: "finishLoading" });
      return;
    }

    // Number of JSON pages this data has:
    const pagesNumber = fetchedData[0].pages;

    // From now on, we only want the second element of the array, which is the one that has values per year:
    fetchedData = fetchedData[1];

    // Store the name of the indicator:
    setIndicatorName(fetchedData[0].indicator.value);

    // Name of the new country:
    const countryName = fetchedData[0].country.value;

    // Sometimes, there's more than one page of values fot the given country and indicator:
    if (pagesNumber > 1) {
      for (let i = 2; i <= pagesNumber; i++) {
        const newData = await fetchThis(link + `&page=${i}`);
        fetchedData = fetchedData.concat(newData[1]);
      }
    }

    /* 
    This fetched data shows newest year to oldest year, but we want the opposite. 
    So, we reverse both arrays (years' values and years): 
    */
    const dataValues = fetchedData.map((el) => el.value).reverse();
    years = fetchedData.map((el) => el.date).reverse();

    // Color that will be used for the line of the new country:
    const newColor = lineColors.pop();
    setLineColors(lineColors);

    // We select only the data that's going to be used in the chart:
    const processedData = dataFiller(countryName, dataValues, newColor);

    // Add the object of data of the newCountry to the array of datasets:
    const newDatasets = datasets;
    newDatasets.push(processedData);
    setDatasets(newDatasets);

    // Build the object that's going to be used as data in the chart:
    const newChartData = {
      labels: years,
      datasets: datasets,
    };

    dispatch({ type: "uploadData", payload: newChartData });

    if (datasets.length >= 4) {
      setIsDisabled(true);
    }
  }

  useEffect(() => {
    try {
      const fetchData = async () => {
        const link = `http://api.worldbank.org/v2/country/${props.match.params.country}/indicator/${props.match.params.indicatorId}?format=json`;
        let fetchedData = await fetchThis(link);

        addData(fetchedData, link);
      };
      fetchData();
      dispatch({ type: "finishLoading" });
    } catch (err) {
      console.log("here");
      dispatch({ type: "finishLoading" });
    }
  }, [props.match.params.country, props.match.params.indicatorId]);

  useEffect(() => {
    if (search.compareTo && search.compareTo !== props.match.params.country) {
      const fetchData = async () => {
        const link = `http://api.worldbank.org/v2/country/${search.compareTo}/indicator/${props.match.params.indicatorId}?format=json`;
        let fetchedData = await fetchThis(link);
        addData(fetchedData, link);
      };
      fetchData();

    }
  }, [
    props.match.params.country,
    props.match.params.indicatorId,
    search.compareTo,
  ]);

  useEffect(() => {
    if (!state.chartData && !state.isLoading) {
      props.history.push("/not-found");
    }
  }, [state.chartData, state.isLoading]);

  function handleChange(e) {
    const query = { compareTo: [e.id, "CHN"]};

    props.history.push(
      `/indicator/${props.match.params.country}/${
        props.match.params.indicatorId
      }?${queryString.stringify(query, {arrayFormat: 'comma'})}`
    );
  }

  console.log("Props: ");
  console.log(props);

  return (
    <div>
      {state.isLoading && <h1>Loading...</h1>}
      {state.chartData && !state.isLoading && (
        <div>
          <div>
            <IndicatorName>{indicatorName}</IndicatorName>
            <div style={{ width: 1200, height: 400 }}>
              <Line
                data={state.chartData}
                width={100}
                height={100}
                options={{ maintainAspectRatio: false }}
              />
            </div>
          </div>
        </div>
      )}
      <div>
        <p>Add another country to the chart</p>
        <Select
          isDisabled={isDisabled}
          onChange={handleChange}
          options={options}
        />
      </div>
    </div>
  );
};

export default ChartPage;
