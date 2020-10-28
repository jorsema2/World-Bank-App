import React, { useState, useEffect, useContext, useReducer } from "react";
import queryString from "query-string";
import "antd/dist/antd.css";
import {
  MainContent,
  StyledLayout,
  IndicatorName,
  ContainerRow,
  ContentLeftContainer,
  ButtonsContainer,
  SelectorsContainer,
  StyledIndicatorsDropdown,
  StyledButton,
  ChartContainer,
  SliderContainer,
  DefaultYear,
  StyledSlider,
  ContentRightContainer,
  SectionHeader,
} from "./style";
import NoDataMessage from "../../components/NoDataMessage";
import Chart from "../../components/Chart";
import MultiSelectSort from "../../components/SelectMoreCountries";
import RecommendedIndicators from "../../components/RecommendedIndicators";
import { SmartContext } from "../../App";
import { chartReducer, chartInitialState } from "../../reducers/chartReducer";
import fetchData from "../../utils/fetchData";
import processData from "../../utils/processData";
import dataFiller from "../../utils/dataFiller";
import modifyQueryString from "../../utils/modifyQueryString";
import chooseColor from "../../utils/chooseColor";
import chooseIDs from "../../utils/chooseIDs";
import storeSelectedCountries from "../../utils/storeSelectedCountries";

const ChartPage = (props) => {
  const { countries, appDispatch } = useContext(SmartContext);
  const [chartState, chartDispatch] = useReducer(
    chartReducer,
    chartInitialState
  );
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState([]);
  const [isServerDown, setIsServerDown] = useState(false);

  const search = queryString.parse(props.location.search);

  useEffect(() => {
    appDispatch({ type: "resetIndicators"})
  }, [])

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
        const link = `http://api.worldbank.org/v2/country/${props.match.params.country}/indicator/${props.match.params.indicatorId}?format=json`;
        const fetchedData = await fetchData(link);

        fetchedData ? setIsServerDown(false) : setIsServerDown(true);

        const isCountry = checkIfIsCountry(fetchedData);
        const wasIndicatorDeleted = checkIfIndicatorWasDeleted(fetchedData);

        const firstColor = "rgba(52, 89, 149, 0.8)";
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
          const link = `http://api.worldbank.org/v2/country/${el.id}/indicator/${props.match.params.indicatorId}?format=json`;
          const chosenColor = chooseColor(el, selected);
          const fetchedData = await fetchData(link);
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

  function changeChart() {
    chartDispatch({ type: "changeChartType" });
  }

  const chartData = {
    labels: chartState.years,
    datasets: chartState.datasets,
  };

  const chartHasData =
    chartState.datasets.length > 0 && chartState.years.length > 0;

  return (
    <MainContent>
      {isServerDown && (
        <div>
          <p>
            Unfortunately, the third party's server which API we use seems to be
            down.
          </p>
          <br></br>
          <p>
            We apologize and we recommend you to visit us in another moment.
          </p>
        </div>
      )}
      {!chartState.isRequestValid && !chartHasData && !isServerDown && (
        <NoDataMessage setSelected={setSelected} />
      )}
      {chartHasData && !isServerDown && (
        <StyledLayout>
          <div>
            <IndicatorName>{chartState.indicatorName}</IndicatorName>
          </div>
          <ContainerRow>
            <ContentLeftContainer>
              <ButtonsContainer>
                <SelectorsContainer>
                  <StyledIndicatorsDropdown
                    history={props.history}
                    search={search}
                    currentCountry={props.match.params.country}
                  />
                  <MultiSelectSort
                    options={options}
                    selected={selected}
                    setSelected={setSelected}
                  />
                </SelectorsContainer>

                <div>
                  <StyledButton onClick={() => changeChart()}>
                    Change chart type
                  </StyledButton>
                </div>
              </ButtonsContainer>
              <ChartContainer>
                {!chartState.isRequestValid && (
                  <NoDataMessage setSelected={setSelected} />
                )}
                {chartState.isRequestValid && (
                  <Chart chartData={chartData} isLine={chartState.isLine} />
                )}
              </ChartContainer>
              <SliderContainer>
                <DefaultYear>1960</DefaultYear>
                <StyledSlider
                  range
                  primaryColor={"#345995"}
                  defaultValue={[1990, 2015]}
                  min={1960}
                  max={2019}
                />
                <DefaultYear>2019</DefaultYear>
              </SliderContainer>
            </ContentLeftContainer>
            <ContentRightContainer>
              <SectionHeader>Recommended indicators</SectionHeader>
              <RecommendedIndicators
                history={props.history}
                search={search}
                currentCountry={props.match.params.country}
              />
            </ContentRightContainer>
          </ContainerRow>
        </StyledLayout>
      )}
    </MainContent>
  );
};

export default ChartPage;
