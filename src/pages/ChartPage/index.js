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

  // Eliminate first country (match.params.country) from array:

  useEffect(() => {
    const newOptions = options.filter(
      (el) => el.id !== props.match.params.country.toUpperCase()
    );
    chartDispatch({ type: "setFilteredOptions", payload: newOptions });
  }, [options]);

  // If access through link, take chosenIDs in query string to make selected countries appear in select dropdown:

  useEffect(() => {
    if (selected.length < 4) {
      const newSelected = chartState.chosenIDs.map((thisSelected) => {
        return chartState.filteredOptions.find(
          (option) => option.id === thisSelected
        );
      });
      setSelected(newSelected);
    }
  }, [chartState.filteredOptions]);

  useEffect(() => {
    /*
    Since colors of the three compareTo countries are reassigned in every 
    render, we need to need to recover all of them in every render to be
    able to assign them again
    */

    chartDispatch({ type: "retrieveColors" });

    /*
    To avoid duplicates because of the forEach method, 
    we need to get rid of all the datasets except for the first:
    */
    const oldDatasets = chartState.datasets;
    const firstDataset = [oldDatasets[0]];
    console.log("First: ")
    console.log(firstDataset);

    chartDispatch({ type: "resetDatasets", payload: firstDataset });

    // Store all the IDs:
    const newIDs = selected.map((el) => el.id);

    modifyQueryString(newIDs, props);
  }, [selected.length]);

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
    years = fetchedData.map((el) => el.date).reverse();

    // Color that will be used for the line of the new country:
    const newColor = chartState.countryColors.pop();
    chartDispatch({ type: "remainingColors", payload: newColor });

    // We select only the data that's going to be used in the chart:
    const processedData = dataFiller(countryName, dataValues, newColor);

    // Add the object of data of the newCountry to the array of datasets:
    console.log("Beginning of addData(): ")
    const oldDatasets = chartState.datasets;
    console.log(oldDatasets);
    const newDatasets = oldDatasets.concat(processedData);
    console.log(newDatasets)
    chartDispatch({ type: "addDataset", payload: newDatasets });
    console.log(chartState.datasets);


    // Build the object that's going to be used as data in the chart:
    const newChartData = {
      labels: years,
      datasets: newDatasets,
    };

    chartDispatch({ type: "uploadData", payload: newChartData });
    console.log(chartState.datasets);
  }

  useEffect(() => {
    try {
      const fetchData = async () => {
        const link = `http://api.worldbank.org/v2/country/${props.match.params.country}/indicator/${props.match.params.indicatorId}?format=json`;
        let fetchedData = await fetchThis(link);

        addData(fetchedData, link);
      };
      fetchData();
      chartDispatch({ type: "finishLoading" });
      chartDispatch({ type: "validateRequest" });
    } catch (err) {
      console.log("here");
      chartDispatch({ type: "finishLoading" });
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

      chartDispatch({ type: "setChosenIDs", payload: arrayIDs });

      // Since we only want to allow 3 countries for comparison:
      const threeIDs = arrayIDs.slice(0, 3);

      threeIDs.forEach((el) => {
        if (el !== props.match.params.country) {
          fetchData(el);
          console.log(chartState.datasets);
        }
      });
      console.log(chartState.datasets);
      modifyQueryString(arrayIDs, props);
    }
  }, [
    props.match.params.country,
    props.match.params.indicatorId,
    search.compareTo,
  ]);

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
