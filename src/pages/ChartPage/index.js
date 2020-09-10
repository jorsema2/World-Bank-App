import React, {useState, useEffect, useContext} from "react";
import styled from "styled-components";
import {Line, Bar} from "react-chartjs-2";
import queryString from "query-string";
import Select from "react-select";
import Header from "../../components/Header";
import NoDataMessage from "../../components/NoDataMessage";
import MultiSelectSort from "../../components/SelectMoreCountries";
import groupedIndicators from "../../utils/groupedIndicators";
import IndicatorsList from "../../components/IndicatorsList";
import fetchThis from "../../utils/fetcher";
import dataFiller from "../../utils/dataFiller";
import modifyQueryString from "../../utils/compareToQueryString";
import {SmartContext} from "../../App";

const IndicatorName = styled.h2`
  color: blue;
  font-familiy: Arial;
  display: flex;
  justify-content: center;
  margin-bottom: 3 rem;
`;

const ChartPage = (props) => {
  const { options, state, dispatch } = useContext(SmartContext);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [invalidRequest, setInvalidRequest] = useState(false);
  const [chosenIDs, setChosenIDs] = useState([]);
  const [selected, setSelected] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [indicatorName, setIndicatorName] = useState();
  const [datasets, setDatasets] = useState([]);
  const [isLine, setIsLine] = useState(true);
  const [lineColors, setLineColors] = useState([
    "rgba(255, 0, 0, 0.8)",
    "rgba(0, 255, 0, 0.8)",
    "rgba(0, 0, 255, 0.8)",
    "rgba(128, 0, 128, 0.8)",
  ]);
  const [showIndicators, setShowIndicators] = useState(false);

  const search = queryString.parse(props.location.search);

  // Eliminate first country (match.params.country) from array:

  useEffect(() => {
    const newOptions = options.filter(el => el.id !== props.match.params.country.toUpperCase());
    setFilteredOptions(newOptions);
  }, [options])

  // If access through link, take chosenIDs in query string to make selected countries appear in select dropdown:

  useEffect(() => {
    if (filteredOptions.length > 3) {
      const newSelected = chosenIDs.map((thisSelected) => {
        return filteredOptions.find((option) => option.id === thisSelected);
      });
      setSelected(newSelected);
    }
  }, [filteredOptions]);

  useEffect(() => {
    console.log(selected);
    /*
    Since colors of the three compareTo countries are reassigned in every 
    render, we need to need to recover all of them in every render to be
    able to assign them again
    */

    setLineColors([
      "rgba(255, 0, 0, 0.8)",
      "rgba(0, 255, 0, 0.8)",
      "rgba(0, 0, 255, 0.8)",
    ]);

    /*
    To avoid duplicates because of the forEach method, 
    we need to get rid of all the datasets except for the first:
    */

    const newDatasets = [datasets[0]];
    setDatasets(newDatasets);

    // Store all the IDs:
    const newIDs = selected.map((el) => el.id);

    modifyQueryString(newIDs, props);
  }, [selected]);

  // Variable that will store years that will be shown in the chart as labels:
  let years;

  async function addData(fetchedData, link) {
    /*
    If there's no data, 0 pages of data or the fetched data has the property called "message",
    it's an invalid request:
    */

    if (
      !fetchedData ||
      fetchedData[0].page === 0 ||
      "message" in fetchedData[0]
    ) {
      dispatch({ type: "finishLoading" });
      setInvalidRequest(true);
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
    datasets.push(processedData);
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
      setInvalidRequest(false);
    } catch (err) {
      console.log("here");
      dispatch({ type: "finishLoading" });
    }
  }, [props.match.params.country, props.match.params.indicatorId]);

  useEffect(() => {
    const fetchData = async (id) => {
      const link = `http://api.worldbank.org/v2/country/${id}/indicator/${props.match.params.indicatorId}?format=json`;
      let fetchedData = await fetchThis(link);
      addData(fetchedData, link);
    };

    if (search.compareTo) {
      // Convert IDs from query string to an array of IDs:
      let arrayIDs = search.compareTo.split(",");

      // Remove duplicates:
      arrayIDs = Array.from(new Set(arrayIDs));

      setChosenIDs(arrayIDs);

      // Since we only want to allow 3 countries for comparison:
      const threeIDs = arrayIDs.slice(0, 3);

      threeIDs.forEach((el) => {
        if (el !== props.match.params.country) {
          fetchData(el);
        }
      });

      modifyQueryString(arrayIDs, props);
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

  function changeChart() {
    const newChartType = !isLine;
    setIsLine(newChartType);
  }

  function openIndicators() {
    dispatch({type: 'showIndicators'});
    const indicatorsOpen = !showIndicators;
    setShowIndicators(indicatorsOpen);
  }

  function closeIndicators() {
    const indicatorsClosed = !showIndicators;
    setShowIndicators(indicatorsClosed);
  }


  return (
    <div>
      {state.isLoading && <h1>Loading...</h1>}
      {invalidRequest && <NoDataMessage />}
      {!invalidRequest && state.chartData && !state.isLoading && (
        <div>
          <Header />
          <div>
            <IndicatorName>{indicatorName}</IndicatorName>
            <div style={{ width: 1200, height: 400 }}>
              {isLine && (
                <Line
                  data={state.chartData}
                  width={100}
                  height={100}
                  options={{ maintainAspectRatio: false }}
                />
              )}
              {!isLine && (
                <Bar
                  data={state.chartData}
                  width={100}
                  height={100}
                  options={{ maintainAspectRatio: false }}
                />
              )}
            </div>
            <div>
              <button onClick={() => changeChart()}>Change chart type</button>
            </div>
          </div>
          <div>
            <p>Add another country to the chart</p>
            <MultiSelectSort
              filteredOptions={filteredOptions}
              selected={selected}
              setSelected={setSelected}
            />
          </div>
          <div>
            <h3>Indicators by topic</h3>
            <Select options={groupedIndicators} />
          </div>
          <div>
            {!showIndicators && (
              <button onClick={() => openIndicators()}>
                Show all indicators
              </button>
            )}
            {showIndicators && (
              <button onClick={() => closeIndicators()}>Hide indicators</button>
            )}
          </div>

          {/* Indicators links do not work properly */}
          {showIndicators && (
            <div>
              <h3>All indicators</h3>
              <IndicatorsList />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChartPage;
