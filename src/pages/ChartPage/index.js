import React, { useState, useEffect, useContext, useReducer } from "react";
import queryString from "query-string";
import Header from "../../components/Header";
import NoDataMessage from "../../components/NoDataMessage";
import Chart from "../../components/Chart";
import Selectors from "../../components/Selectors";
import { SmartContext } from "../../App";
import { chartReducer, chartInitialState } from "../../Reducers/chartReducer";
import fetchData from "../../utils/dataFetcher";
import processData from "../../utils/dataProcessor";
import modifyQueryString from "../../utils/compareToQueryString";
import chooseColor from "../../utils/colorChooser";
import chartObjectBuilder from "../../utils/chartFiller";
import chooseIDs from "../../utils/IDsChooser";
import storeSelectedCountries from "../../utils/storeSelectedCountries";

const ChartPage = (props) => {
  const { options } = useContext(SmartContext);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [chartState, chartDispatch] = useReducer(
    chartReducer,
    chartInitialState
  );
  const [selected, setSelected] = useState([]);

  const search = queryString.parse(props.location.search);

  useEffect(() => {
    try {
      async function addData() {
        const [fetchedData, link] = await fetchData(
          props.match.params.country,
          props.match.params.indicatorId
        );
        const firstColor = "rgba(128, 0, 128, 0.8)";
        const firstDataset = await processData(fetchedData, link, firstColor);
        if (firstDataset === null) {
          chartDispatch({ type: "invalidateRequest" });
        } else {
          const { indicatorName, yearsArray, countryDataset } = firstDataset;
          chartDispatch({ type: "updateDatasets", payload: [countryDataset] });
          chartDispatch({ type: "updateYears", payload: yearsArray });
          chartDispatch({ type: "setIndicatorName", payload: indicatorName });
          chartDispatch({ type: "finishLoading" });
          chartDispatch({ type: "validateRequest" });
        }
      }
      addData();
    } catch (err) {
      chartDispatch({ type: "finishLoading" });
    }
  }, []);

  useEffect(() => {
    // Don't show the first chosen country in the select dropdown:
    const newOptions = options.filter(
      (el) => el.id !== props.match.params.country.toUpperCase()
    );
    setFilteredOptions(newOptions);
  }, [options]);

  useEffect(() => {
    console.log(selected);
    // We don't want this effect to be used unless we already know the years:

    if (chartState.years.length < 1) return;

    /*
        To avoid duplicates because of the forEach method, 
        we need to get rid of all the datasets except for the first:
        */

    const oldDatasets = chartState.datasets;
    const firstDataset = [oldDatasets[0]];

    chartDispatch({ type: "resetDatasets", payload: firstDataset });

    let newDatasets = firstDataset;

    // Add data for new selected countries if necessary:

    selected.forEach((el) => {
      async function getMoreCountries(el) {
        const chosenColor = chooseColor(el, selected);
        const dataAndLink = await fetchData(el.id, props.match.params.indicatorId);
        console.log(dataAndLink);
        const [fetchedData, link] = dataAndLink;
        const newDataset = await processData(fetchedData, link, chosenColor);
        console.log(newDataset);
        newDatasets.push(newDataset.countryDataset);
      }
      getMoreCountries(el);
    });

    // Data for chart needs an specific data structure we get by using this:
    const objectForChart = chartObjectBuilder(chartState.years, newDatasets);

    console.log(objectForChart);

    chartDispatch({ type: "uploadData", payload: objectForChart });

    // In case we need to add IDs to query string:
    console.log(selected);
    const newIDs = selected.map((el) => el.id);

    modifyQueryString(newIDs, props);
  }, [chartState.indicatorName, selected.length]);

  useEffect(() => {
    if (search.compareTo) {

      // Convert search.compareTO (string of countries) into an array of IDs:
      const chosenIDs = chooseIDs(search.compareTo);

      // Modify queryString if necessary (if there were more than 3 countries in string):
      modifyQueryString(chosenIDs, props);

      // Store selected countries in state hook:
      const countriesSelected = storeSelectedCountries(chosenIDs, filteredOptions);
      setSelected(countriesSelected);
    }
    console.log(selected);
  }, [search.compareTo]);

  useEffect(() => {
    if (!chartState.chartData && !chartState.isLoading) {
      props.history.push("/not-found");
    }
  }, [chartState.chartData, chartState.isLoading]);

  console.log(chartState.chartData);
  return (
    <div>
      <Header />
      {!chartState.isRequestValid && <NoDataMessage />}
      {chartState.isRequestValid &&
        chartState.datasets.length > 0 &&
        chartState.years.length > 0 && (
          <div>
            <Chart
              chartData={chartState.chartData}
              indicatorName={chartState.indicatorName}
            />
            <Selectors
              filteredOptions={filteredOptions}
              selected={selected}
              setSelected={setSelected}
            />
          </div>
        )}
    </div>
  );
};

export default ChartPage;
