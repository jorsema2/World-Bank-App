import React, { useState, useEffect, useContext, useReducer } from "react";
import queryString from "query-string";
import { Layout } from "antd";
import 'antd/dist/antd.css';
import NavMenu from "../../components/NavMenu";
import HomeButton from "../../components/HomeButton";
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

  const { Header, Footer, Sider, Content } = Layout;

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
        const isCountry = checkIfIsCountry(fetchedData);
        const wasIndicatorDeleted = checkIfIndicatorWasDeleted(fetchedData);

        const firstColor = "rgba(128, 0, 128, 0.8)";
        const firstDataset = await processData(fetchedData, link, firstColor);
        if (firstDataset === null || !isCountry || wasIndicatorDeleted) {
          chartDispatch({ type: "invalidateRequest" });
          return;
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
          chartDispatch({ type: "validateRequest" });
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
    if (selected.length === 0 && chartState.datasets.length < 1) return;

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
          const isCountry = checkIfIsCountry(fetchedData);
          if (!isCountry) {
            const newDataset = dataFiller(
              el.value + " (No Data)",
              [],
              chosenColor
            );
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

  function checkIfIsCountry(data) {
    if (data.length > 1) {
      return true;
    }
    return false;
  }

  function checkIfIndicatorWasDeleted(data) {
    if (data.length === 1) {
      return true;
    }
    return false;
  }

  const chartData = {
    labels: chartState.years,
    datasets: chartState.datasets,
  };

  const chartHasData =
    chartState.datasets.length > 0 && chartState.years.length > 0;

  return (
    <Layout>
      <Sider>
        <HomeButton />
        <NavMenu />
      </Sider>
      <Layout>
        <Header style={{ backgroundColor: 'green', height: 96 }}>
          <h3 style={{ height: 32 }}>Welcome to World Charts</h3>
          <h4 style={{ height: 32 }}>A React App by Jorge Segura</h4> 
        </Header>
        <Content>
          {!chartState.isRequestValid && !chartHasData && (
            <NoDataMessage setSelected={setSelected} />
          )}
          {!chartState.isRequestValid && chartHasData && (
            <div>
              <NoDataMessage setSelected={setSelected} />
              <Selectors
                filteredOptions={filteredOptions}
                selected={selected}
                setSelected={setSelected}
                history={props.history}
                search={search}
              />
            </div>
          )}
          {chartState.isRequestValid && chartHasData && (
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
        </Content>
        <Footer style={{ backgroundColor: 'pink', height: 256 }}>*EMPTY BOX FOR FUTURE CONTENT*</Footer>
      </Layout>
    </Layout>
  );
};

export default ChartPage;
