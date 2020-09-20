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
      const [fetchedData, link] = fetchData(
        props.match.params.country,
        props.match.params.indicatorId
      );
      const firstColor = "rgba(128, 0, 128, 0.8)";
      const firstDataset = async function getFirstDataset() {
        const firstDataset = await processData(fetchedData, link, firstColor);
        return firstDataset;
      };
      firstDataset();
      if (firstDataset === null) {
        chartDispatch({ type: "invalidateRequest" });
      } else {
        [indicatorName, yearsArray, countryDataset] = firstDataset;
        chartDispatch({ type: "updateDatasets", payload: [countryDataset] });
        chartDispatch({ type: "updateYears", payload: yearsArray });
        chartDispatch({ type: "setIndicatorName", payload: indicatorName });
        chartDispatch({ type: "finishLoading" });
        chartDispatch({ type: "validateRequest" });
      }
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
    /*
        To avoid duplicates because of the forEach method, 
        we need to get rid of all the datasets except for the first:
        */

    const oldDatasets = chartState.datasets;
    const firstDataset = [oldDatasets[0]];

    chartDispatch({ type: "resetDatasets", payload: firstDataset });

    let newDatasets = [];

    selected.forEach((el) => {
      const chosenColor = chooseColor(el);
      const dataAndLink = fetchData(el.id, chosenColor);
      [fetchedData, link] = dataAndLink;
      const newDataset = async function getNewDataset() {
        const newDataset = await processData(fetchedData, link, firstColor);
        return newDataset;
      };
      newDatasets.push(newDataset);
    });

    // Data for chart needs an specific data structure we get by using this:
    const objectForChart = chartObjectBuilder(chartState.years, newDatasets);

    chartDispatch({ type: "uploadData", payload: objectForChart });

    // In case we need to add IDs to query string:
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
      const countriesSelected = storeSelectedCountries(chosenIDs);
      setSelected(countriesSelected);
    }
  }, [search.compareTo]);

  useEffect(() => {
    if (!chartState.chartData && !chartState.isLoading) {
      props.history.push("/not-found");
    }
  }, [chartState.chartData, chartState.isLoading]);

  return (
    <div>
      <Header />
      {!chartState.isRequestValid && <NoDataMessage />}
      {chartState.isRequestValid && (
        <div>
          <Chart />
          <Selectors filteredOptions={filteredOptions}           selected={selected}
          setSelected={setSelected} />
        </div>
      )}
    </div>
  );
};

export default ChartPage;
