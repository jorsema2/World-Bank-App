import React, { useState, useEffect, useContext, useReducer } from "react";
import styled from "styled-components";
import { Line, Bar } from "react-chartjs-2";
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
import { SmartContext } from "../../App";
import { chartReducer, chartInitialState } from "../../Reducers/chartReducer";

const IndicatorName = styled.h2`
  color: blue;
  font-familiy: Arial;
  display: flex;
  justify-content: center;
  margin-bottom: 3 rem;
`;

const ChartPage = (props) => {
  const { options, appDispatch } = useContext(SmartContext);
  const [chartState, chartDispatch] = useReducer(
    chartReducer,
    chartInitialState
  );
  const [selected, setSelected] = useState([]);

  const search = queryString.parse(props.location.search);

  useEffect(() => {
    // Don't show the first chosen country in the select dropdown:
    const newOptions = options.filter(
      (el) => el.id !== props.match.params.country.toUpperCase()
    );
    chartDispatch({ type: "setFilteredOptions", payload: newOptions });
  }, [options]);

  async function fetchData(id, color) {
    const link = `http://api.worldbank.org/v2/country/${id}/indicator/${props.match.params.indicatorId}?format=json`;
    const fetchedData = await fetchThis(link);
    const newDataset = addData(fetchedData, link, color);
    const oldDatasets = [...chartState.datasets];
    chartDispatch({ type: "updateDataset", payload: [...oldDatasets, newDataset] });
  };

  useEffect(() => {

    /*
    To avoid duplicates because of the forEach method, 
    we need to get rid of all the datasets except for the first:
    */

    const oldDatasets = chartState.datasets;
    const firstDataset = [oldDatasets[0]];

    chartDispatch({ type: "resetDatasets", payload: firstDataset });

    selected.forEach((el) => {
      const chosenColor = chooseColor(el);
      fetchData(el.id, chosenColor);
    })

    
    // Build the object that's going to be used as data in the chart:
    const newChartData = {
      labels: chartState.years,
      datasets: chartState.datasets,
    };

    chartDispatch({ type: "uploadData", payload: newChartData });

    // In case we need to add IDs to query string:
    const newIDs = selected.map((el) => el.id);

    modifyQueryString(newIDs, props);
  }, [selected.length]);

  async function addData(fetchedData, link, newColor) {
    /*
    If there's no data, 0 pages of data or the fetched data has the property called "message",
    it's an invalid request:
    */

    if (
      !fetchedData ||
      fetchedData[0].page === 0 ||
      "message" in fetchedData[0]
    ) {
      chartDispatch({ type: "finishLoading" });
      chartDispatch({ type: "invalidateRequest" });
      return;
    }

    // Number of JSON pages this data has:
    const pagesNumber = fetchedData[0].pages;

    // From now on, we only want the second element of the array, which is the one that has values per year:
    fetchedData = fetchedData[1];

    // Store the name of the indicator:
    chartDispatch({
      type: "setIndicatorName",
      payload: fetchedData[0].indicator.value,
    });

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
    const yearsArray = fetchedData.map((el) => el.date).reverse();

    chartDispatch({ type: "updateYears", payload: yearsArray })
    console.log(yearsArray);

    // We select only the data that's going to be used in the chart:
    const processedData = dataFiller(countryName, dataValues, newColor);

    return processedData;
  }

  function chooseColor(country) {
    const colorPosition = selected.indexOf(country);
    const chosenColor = chartState.countryColors[colorPosition];
    return chosenColor;
  }

  useEffect(() => {
    console.log(chartState.years);
    // Build the object that's going to be used as data in the chart:
    const newChartData = {
      labels: chartState.years,
      datasets: chartState.datasets,
    };
    chartDispatch({ type: "uploadData", payload: newChartData });
  }, [chartState.datasets]);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const link = `http://api.worldbank.org/v2/country/${props.match.params.country}/indicator/${props.match.params.indicatorId}?format=json`;
        const fetchedData = await fetchThis(link);
        const firstColor = "rgba(128, 0, 128, 0.8)";
        const firstDataset = await addData(fetchedData, link, firstColor);
        console.log(chartState);
        chartDispatch({ type: "updateDatasets", payload: firstDataset });
      };
      fetchData();
      chartDispatch({ type: "finishLoading" });
      chartDispatch({ type: "validateRequest" });
    } catch (err) {
      console.log("here");
      chartDispatch({ type: "finishLoading" });
    }
  }, []);

  function storeSelectedCountries(allIDs) {
    const newSelected = allIDs.map((chosenID) => {
      return chartState.filteredOptions.find(
        (option) => option.id === chosenID
      );
    });
    return newSelected;
  }

  function chooseIDs(IDsInString) {
    // Convert IDs from query string to an array of IDs:
    let arrayIDs = IDsInString.split(",");

    // Remove duplicates:
    arrayIDs = Array.from(new Set(arrayIDs));

    // Since we only want to allow 3 countries for comparison:
    const chosenIDs = arrayIDs.slice(0, 3);

    return chosenIDs;
  }

  useEffect(() => {
    if (search.compareTo) {

      // Convert search.compareTO (string of countries) into an array of IDs:
      const chosenIDs = chooseIDs(search.compareTo);

      // Modify queryString if necessary (if there were more than 3 countries in string):
      modifyQueryString(chosenIDs, props);

      // Store selected countries in state hook:
      const countriesSelected = storeSelectedCountries(chosenIDs);
      setSelected(countriesSelected);
    }
  }, [search.compareTo]);

  useEffect(() => {
    if (!chartState.chartData && !chartState.isLoading) {
      props.history.push("/not-found");
    }
  }, [chartState.chartData, chartState.isLoading]);

  function changeChart() {
    chartDispatch({ type: "changeChartType" });
  }

  function openIndicators() {
    appDispatch({ type: "resetIndicators" });
    chartDispatch({ type: "openIndicators" });
  }

  function closeIndicators() {
    chartDispatch({ type: "closeIndicators" });
  }

  return (
    <div>
      {chartState.isLoading && <h1>Loading...</h1>}
      {!chartState.isRequestValid && <NoDataMessage />}
      {chartState.isRequestValid &&
        chartState.chartData &&
        !chartState.isLoading && (
          <div>
            <Header />
            <div>
              <IndicatorName>{chartState.indicatorName}</IndicatorName>
              <div style={{ width: 1200, height: 400 }}>
                {chartState.isLine && (
                  <Line
                    data={chartState.chartData}
                    width={100}
                    height={100}
                    options={{ maintainAspectRatio: false }}
                  />
                )}
                {!chartState.isLine && (
                  <Bar
                    data={chartState.chartData}
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
                filteredOptions={chartState.filteredOptions}
                selected={selected}
                setSelected={setSelected}
              />
            </div>
            <div>
              <h3>Indicators by topic</h3>
              <Select options={groupedIndicators} />
            </div>
            <div>
              {/* If no appState.firstCountry --> Failed to compile (from refresh or copypasting link) */}
              {!chartState.areIndicatorsShown && (
                <button onClick={() => openIndicators()}>
                  Show all indicators
                </button>
              )}
              {chartState.areIndicatorsShown && (
                <button onClick={() => closeIndicators()}>
                  Hide indicators
                </button>
              )}
            </div>

            {/* Indicators links do not work properly */}
            {chartState.areIndicatorsShown && (
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
