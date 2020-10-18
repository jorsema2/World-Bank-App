import React, { useState, useEffect, useContext, useReducer } from "react";
import queryString from "query-string";
import { Link } from "react-router-dom";
import {
  GlobalOutlined,
  GithubOutlined,
  LinkedinFilled,
  MailOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import {
  StyledLayout,
  StyledHeader,
  AppTitle,
  HeaderMenu,
  MenuItem,
  StyledContent,
  IndicatorName,
  ContainerRow,
  ContentLeftContainer,
  ButtonContainer,
  StyledIndicatorsDropdown,
  ChartContainer,
  SliderContainer,
  StyledSlider,
  ContentRightContainer,
  StyledFooter,
  FooterMenu,
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
  const { countries, appState, appDispatch } = useContext(SmartContext);
  const [chartState, chartDispatch] = useReducer(
    chartReducer,
    chartInitialState
  );
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState([]);

  const search = queryString.parse(props.location.search);

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
    <div>
      {!chartState.isRequestValid && !chartHasData && (
        <NoDataMessage setSelected={setSelected} />
      )}
      {chartHasData && (
        <StyledLayout>
          <StyledHeader>
            <AppTitle>
              <Link to="/">
                <GlobalOutlined /> World Charts
              </Link>
            </AppTitle>
            <HeaderMenu>
              <MenuItem>
                <a
                  target="_blank"
                  href="https://www.linkedin.com/in/jorge-segura-mart%C3%ADnez-6b53851b3/"
                >
                  <LinkedinFilled />
                  LinkedIn
                </a>
              </MenuItem>
              <MenuItem>
                <a target="_blank" href="https://github.com/jorsema2">
                  <GithubOutlined /> GitHub
                </a>
              </MenuItem>
            </HeaderMenu>
          </StyledHeader>
          <StyledContent>
            <div>
              <IndicatorName>{chartState.indicatorName}</IndicatorName>
            </div>
            <ContainerRow>
              <ContentLeftContainer>
                <ButtonContainer>
                  <StyledIndicatorsDropdown
                    history={props.history}
                    search={search}
                    currentCountry={props.match.params.country}
                  />
                  <div>
                    <button onClick={() => changeChart()}>
                      Change chart type
                    </button>
                  </div>
                </ButtonContainer>
                <ChartContainer>
                  {!chartState.isRequestValid && (
                    <NoDataMessage setSelected={setSelected} />
                  )}
                  {chartState.isRequestValid && (
                    <Chart chartData={chartData} isLine={chartState.isLine} />
                  )}
                </ChartContainer>
                <SliderContainer>
                  <p>1960</p>
                  <StyledSlider
                    range
                    defaultValue={[1990, 2015]}
                    min={1960}
                    max={2019}
                  />
                  <p>2019</p>
                </SliderContainer>
              </ContentLeftContainer>
              <ContentRightContainer>
                <h3>Recommended indicators</h3>
                <RecommendedIndicators
                  history={props.history}
                  search={search}
                  currentCountry={props.match.params.country}
                />
              </ContentRightContainer>
            </ContainerRow>
            <div>
              <p>Add another country to the chart</p>
              <MultiSelectSort
                options={options}
                selected={selected}
                setSelected={setSelected}
              />
            </div>
          </StyledContent>
          <StyledFooter>
            <div>
              <h3>Welcome to World Charts</h3>
              <h4>A React App by Jorge Segura</h4>
            </div>
            <FooterMenu>
              <MenuItem>
                <a href="mailto: jorsema2@gmail.com">
                  <MailOutlined />
                  jorsema2@gmail.com
                </a>
              </MenuItem>
              <MenuItem>
                <a
                  target="_blank"
                  href="https://www.linkedin.com/in/jorge-segura-mart%C3%ADnez-6b53851b3/"
                >
                  <LinkedinFilled />
                  LinkedIn
                </a>
              </MenuItem>
              <MenuItem>
                <a target="_blank" href="https://github.com/jorsema2">
                  <GithubOutlined /> GitHub
                </a>
              </MenuItem>
            </FooterMenu>
          </StyledFooter>
        </StyledLayout>
      )}
    </div>
  );
};

export default ChartPage;
