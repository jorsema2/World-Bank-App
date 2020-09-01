import React, {useState, useEffect, useContext} from "react";
import styled from "styled-components";
import {Line} from "react-chartjs-2";
import queryString from "query-string";
import Select from "react-select";
import fetchThis from "../../utils/fetcher";
import dataFiller from "../../utils/dataFiller";
import {SmartContext} from "../../App";

const IndicatorName = styled.h2`
  color: blue;
  font-familiy: Arial;
  display: flex;
  justify-content: center;
  margin-bottom: 3 rem;
`;

const IndicatorPage = (props) => {
  const {options, state, dispatch} = useContext(SmartContext);
  const {isDisabled, setIsDisabled} = useState(false)

  const search = queryString.parse(props.location.search);

  // Variables that will store info that will be shown in the chart:

  let indicatorName;
  let lineColors = ['rgba(255, 0, 0, 0.2)', 'rgba(0, 255, 0, 0.2)', 'rgba(0, 0, 255, 0.2)', 'rgba(255, 255, 0, 0.2)'];
  let labels;
  let datasets = [];

  async function addData (fetchedData, link) {
    if (!fetchedData || fetchedData[0].page === 0) {
      dispatch({type: 'finishLoading'});
      return;
    }

    // Number of JSON pages this data has:
    const pagesNumber = fetchedData[0].pages;

    // From now on, we only want the second element of the array, which is the one that has values per year:
    fetchedData = fetchedData[1];

    // Store the name of the indicator:
    indicatorName = fetchedData[0].indicator.value;

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
    const dataValues = fetchedData.map((el) =>  el.value).reverse();
    labels = fetchedData.map((el) => el.date).reverse();

    // Color that will be used for the line of the new country:
    const newColor = lineColors.pop();

    // We select only the data that's going to be used in the chart:
    const processedData = dataFiller(countryName, dataValues, newColor);

    // Add the object of data of the newCountry to the array of datasets:
    datasets.push(processedData);

    // Build the object that's going to be used as data in the chart:
    const newChartData = {
      labels: labels,
      datasets: datasets
    }

    dispatch({type: 'uploadData', payload: newChartData});

    if(state.chosenCountries.length >= 4) {
      setIsDisabled(true);
    }
  }

  useEffect(() => {
    console.log('0')
    try {
      const fetchData = async () => {
        const link = `http://api.worldbank.org/v2/country/${props.match.params.country}/indicator/${props.match.params.indicatorId}?format=json`;
        let fetchedData = await fetchThis(link);

        addData(fetchedData, link);
      };
      fetchData();
      dispatch({type: 'finishLoading'});
    } catch (err) {
      console.log("here");
      dispatch({type: 'finishLoading'});
    }
  }, [props.match.params]);

  useEffect(() => {
    console.log('1')
    if(search.compareTo && search.compareTo !== props.match.params.country) {
      const fetchData = async () => {
        const link = `http://api.worldbank.org/v2/country/${search.compareTo}/indicator/${props.match.params.indicatorId}?format=json`;
        let fetchedData = await fetchThis(link);
        addData(fetchedData, link);
      }
      fetchData();
    }
  
  }, [props.match.params.country, props.match.params.indicatorId, search.compareTo]);

  console.log(props)

  useEffect(() => {
    console.log('2')
    if(!state.chartData && !state.isLoading){
      props.history.push('/not-found')
    }
  }, [props])

  function handleChange(e) {
    const query = { compareTo: e.id };

    props.history.push(
      `/indicator/${props.match.params.country}/${
        props.match.params.indicatorId
      }?${queryString.stringify(query)}`
    );
    const selectedCountry = options.find(obj => obj.value === e.value);
    dispatch({type: 'addCountry', payload: selectedCountry})
  }


  return (
    <div>
      {state.isLoading && <h1>Loading...</h1>}
      {state.chartData && !state.isLoading && (
        <div>
            <div>
            <IndicatorName>{indicatorName}</IndicatorName>
            <div style={{width: 1200, height: 800}} >
            <Line
              data={state.chartData}
              width={100}
              height={100}
              options={{maintainAspectRatio: false}}
            />
            </div>     
          </div>
          <div>
            {state.chosenCountries.map((chosenCountry) => (
              <div>
                <button>X</button>
                <div>
                  {chosenCountry.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div>
        <p>Add another country to the chart</p>
        <Select isDisabled={isDisabled} onChange={handleChange} options={options} />
      </div>
    </div>
  );
};

export default IndicatorPage;
