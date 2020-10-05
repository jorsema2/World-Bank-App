import React, { useState, useEffect, useContext, useReducer } from "react";
import queryString from "query-string";
import Header from "../../components/Header";
import NoDataMessage from "../../components/NoDataMessage";
import Chart from "../../components/Chart";
import Selectors from "../../components/Selectors";
import { SmartContext } from "../../App";
import { chartReducer, chartInitialState } from "../../reducers/chartReducer";
import fetchData from "../../utils/dataFetcher";
import processData from "../../utils/dataProcessor";
import dataFiller from "../../utils/dataFiller";
import modifyQueryString from "../../utils/compareToQueryString";
import chooseColor from "../../utils/colorChooser";
import chooseIDs from "../../utils/IDsChooser";
import storeSelectedCountries from "../../utils/storeSelectedCountries";

const ChartPage = (props) => {
  const { options, appDispatch } = useContext(SmartContext); //rename this to countries
  const [chartState, chartDispatch] = useReducer(
    chartReducer,
    chartInitialState
  );
  const [filteredOptions, setFilteredOptions] = useState([]); //rename this to options
  const [selected, setSelected] = useState([]);

  const search = queryString.parse(props.location.search);

  useEffect(() => {
    if (search.compareTo && filteredOptions[0] !== undefined) {
      // !filteredOptions.length
      // Convert search.compareTO (string of countries) into an array of IDs:
      const chosenIDs = chooseIDs(search.compareTo);

      // Modify queryString if necessary (if there were more than 3 countries in string):
      modifyQueryString(chosenIDs, props);

      // Store selected countries in state hook:
      const countriesSelected = storeSelectedCountries(
        chosenIDs,
        filteredOptions
      );

      setSelected(countriesSelected);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      async function addData() {
        const { fetchedData, link } = await fetchData(
          props.match.params.country,
          props.match.params.indicatorId
        );

        const firstColor = "rgba(128, 0, 128, 0.8)";
        const firstDataset = await processData(fetchedData, link, firstColor);
        if (firstDataset === null) {
          chartDispatch({ type: "invalidateRequest" });
        } else {
          const { indicatorName, yearsArray, countryDataset } = firstDataset;
          chartDispatch({
            type: "FETCH_DATA_SUCCESS",
            payload: {
              datasets: [countryDataset],
              years: yearsArray,
              indicatorName,
            },
          });
        }
      }
      addData();
    } catch (err) {
      chartDispatch({ type: "finishLoading" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.match.params.country, props.match.params.indicatorId]);

  useEffect(() => {
    const firstCountry = options.find(
      (obj) => obj.id === props.match.params.country.toUpperCase()
    );
    appDispatch({ type: "selectedCountry", payload: firstCountry });

    if (!selected.length && options.length && search.compareTo) {
      const defaultSelected = storeSelectedCountries(
        chooseIDs(search.compareTo),
        options
      );
      setSelected(defaultSelected);
      return; // unnecessary
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  useEffect(() => {
    // Don't show the first chosen country in the select dropdown:
    const newOptions = options.filter(
      (el) => el.id !== props.match.params.country.toUpperCase()
    );
    setFilteredOptions(newOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options, props.match.params.country]);

  useEffect(() => {
    if (selected.length === 0) return;

    const countriesIDs = selected.map((el) => {
      return el.id;
    });

    modifyQueryString(countriesIDs, props);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  useEffect(() => {
    // We don't want this effect to be used unless we already know the years:
    if (!chartState.years.length) return;
    async function getSelectedCountriesDatasets() {
      const newDatasets = await Promise.all(
        selected.map(async function (el) {
          const chosenColor = chooseColor(el, selected);
          const { fetchedData, link } = await fetchData(
            el.id,
            props.match.params.indicatorId
          );
          const isCountry = checkIfIsCountry(fetchedData)
          if(!isCountry) {
            const newDataset = dataFiller(el.value + " (No Data)", [], chosenColor);
            return newDataset;
          }
          const newDataset = await processData(fetchedData, link, chosenColor);

          if (!newDataset) return null;
          return newDataset.countryDataset;
        })
      );
      const filteredDatasets = newDatasets.filter((data) => data !== null);

      chartDispatch({
        type: "FETCH_DATA_SUCCESS",
        payload: {
          datasets: [chartState.datasets[0], ...filteredDatasets], // why are you spreading an object into an array???
        },
      });
    }
    getSelectedCountriesDatasets();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected.length, chartState.years, props.match.params.indicatorId]);

  useEffect(() => {
    if (!chartState.chartData && !chartState.isLoading) {
      props.history.push("/not-found");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartState.chartData, chartState.isLoading]);

  function checkIfIsCountry(fetchedData) {
    if(fetchedData.length > 1) {
      return true;
    }
    return false
  }

  const chartData = {
    labels: chartState.years,
    datasets: chartState.datasets,
  };

  return (
    <div>
      <Header />
      {!chartState.isRequestValid && <NoDataMessage />}
      {chartState.isRequestValid &&
        chartState.datasets.length > 0 &&
        chartState.years.length > 0 && (
          <div>
            <Chart
              chartData={chartData}
              indicatorName={chartState.indicatorName}
            />
            <Selectors
              filteredOptions={filteredOptions}
              selected={selected}
              setSelected={setSelected}
              history={props.history}
              search={search}
            />
          </div>
        )}
    </div>
  );
};

export default ChartPage;
