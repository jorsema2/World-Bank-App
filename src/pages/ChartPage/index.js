import React, { useState, useEffect, useContext, useReducer } from "react";
import queryString from "query-string";
import { Layout, Slider } from "antd";
import "antd/dist/antd.css";
import styled from "styled-components";
import Select from "react-select";
import NavMenu from "../../components/NavMenu";
import NoDataMessage from "../../components/NoDataMessage";
import Chart from "../../components/Chart";
import IndicatorsList from "../../components/IndicatorsList";
import MultiSelectSort from "../../components/SelectMoreCountries";
import { SmartContext } from "../../App";
import { chartReducer, chartInitialState } from "../../reducers/chartReducer";
import fetchData from "../../utils/fetchData";
import processData from "../../utils/processData";
import dataFiller from "../../utils/dataFiller";
import modifyQueryString from "../../utils/modifyQueryString";
import chooseColor from "../../utils/chooseColor";
import chooseIDs from "../../utils/chooseIDs";
import storeSelectedCountries from "../../utils/storeSelectedCountries";
import groupedIndicators from "../../utils/groupedIndicators";

const IndicatorName = styled.h2`
  color: blue;
  font-familiy: Arial;
  display: flex;
  justify-content: center;
  margin-bottom: 3 rem;
`;

const ChartPage = (props) => {
  const { countries, appState, appDispatch } = useContext(SmartContext);
  const [chartState, chartDispatch] = useReducer(
    chartReducer,
    chartInitialState
  );
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState([]);
  const [areIndicatorsShown, setIndicatorsShown] = useState(false);

  const search = queryString.parse(props.location.search);

  const { Header, Footer, Sider, Content } = Layout;

  const StyledContent = styled(Content)`
  background-color: yellow;
  padding: 16px;
  paddingColor: yellow;
  `

  useEffect(() => {
    if (search.compareTo && options[0] !== undefined) {

      // Convert search.compareTO (string of countries) into an array of IDs:
      const chosenIDs = chooseIDs(search.compareTo);

      modifyQueryString(chosenIDs, props);

      const countriesSelected = storeSelectedCountries(chosenIDs, options);

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
    const currentCountry = countries.find(
      (obj) => obj.id === props.match.params.country.toUpperCase()
    );
    appDispatch({ type: "selectedCountry", payload: currentCountry });

    if (!selected.length && countries.length && search.compareTo) {
      const defaultSelected = storeSelectedCountries(
        chooseIDs(search.compareTo),
        countries
      );
      setSelected(defaultSelected);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countries]);

  useEffect(() => {
    // Don't show the first chosen country in the select dropdown:
    const newOptions = countries.filter(
      (el) => el.id !== props.match.params.country.toUpperCase()
    );
    setOptions(newOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countries, props.match.params.country]);

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

  useEffect(() => {
    appDispatch({ type: "resetIndicators" });
  }, [appDispatch, areIndicatorsShown]);

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

  function changeChart() {
    chartDispatch({ type: "changeChartType" });
  }

  const changeIndicator = (newIndicator) => {
    const hasSearch = search && search.compareTo;

    const otherCountries = hasSearch ? `?compareTo=${search.compareTo}` : "";

    props.history.push(
      `/indicator/${appState.firstCountry.id}/${newIndicator.id}/${otherCountries}`
    );
  };

  const chartData = {
    labels: chartState.years,
    datasets: chartState.datasets,
  };

  const chartHasData =
    chartState.datasets.length > 0 && chartState.years.length > 0;

    console.log(props)

  return (
    <div>
      {!chartState.isRequestValid && !chartHasData && (
        <NoDataMessage setSelected={setSelected} />
      )}
      {chartHasData && (
        <Layout>
          <Sider style={{ backgroundColor: "white" }}>
            <NavMenu />
          </Sider>
          <Layout style={{ padding: 16 }}>
            <Header style={{ backgroundColor: "green", height: 96 }}>
              <h3 style={{ height: 32 }}>Welcome to World Charts</h3>
              <h4 style={{ height: 32 }}>A React App by Jorge Segura</h4>
            </Header>
            <StyledContent
              style={{
                backgroundColor: "yellow",
                padding: 16,
                paddingColor: "yellow",
              }}
            >
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    width: 768,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "baseline",
                    }}
                  >
                    <div>
                      <button
                        onClick={() => setIndicatorsShown(!areIndicatorsShown)}
                      >
                        All indicators
                      </button>
                      {areIndicatorsShown && (
                        <div>
                          <IndicatorsList search={props.location.search} />
                        </div>
                      )}
                    </div>
                    <IndicatorName>{chartState.indicatorName}</IndicatorName>
                    <div>
                      <button onClick={() => changeChart()}>
                        Change chart type
                      </button>
                    </div>
                  </div>
                  <div style={{ width: 768, height: 400 }}>
                    {!chartState.isRequestValid && (
                      <NoDataMessage setSelected={setSelected} />
                    )}
                    {chartState.isRequestValid && (
                      <Chart chartData={chartData} isLine={chartState.isLine} />
                    )}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "baseline",
                    }}
                  >
                    <p>1960</p>
                    <Slider
                      range
                      defaultValue={[1990, 2015]}
                      min={1960}
                      max={2019}
                      style={{ minWidth: 360 }}
                    />
                    <p>2019</p>
                  </div>
                </div>
                <div>
                  <h3>Recommended indicators</h3>
                  <Select
                    options={groupedIndicators}
                    onChange={changeIndicator}
                  />
                </div>
              </div>
              <div>
                <p>Add another country to the chart</p>
                <MultiSelectSort
                  options={options}
                  selected={selected}
                  setSelected={setSelected}
                />
              </div>
            </StyledContent>
            <Footer style={{ backgroundColor: "pink", height: 256 }}>
              *EMPTY BOX FOR FUTURE CONTENT*
            </Footer>
          </Layout>
        </Layout>
      )}
    </div>
  );
};

export default ChartPage;
