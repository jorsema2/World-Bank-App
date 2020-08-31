import React, { useState, useEffect, useReducer } from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {ThemeProvider} from 'styled-components'
import {Home} from "./pages/Home/index.js";
import Indicator from "./pages/Indicator";
import FourOhFour from "./components/FourOhFour/index.js";
import fetchThis from "./utils/fetcher";


export const SmartContext = React.createContext();

export function appReducer(state, action) {
  switch (action.type) {
    case 'firstCountry': {
      return {
        ...state,
        chosenCountries: [SelectedCountry]
      };
    }
    case 'restartIndicatorsList': {
      return {
        ...state,
        page: 1,
        indicators: []
      };
    }
    case 'startIndicatorsFetch': {
      return {
        ...state,
        isFetching: true
      };
    }
    case 'finishIndicatorFetch': {
      return {
        ...state,
        indicators: [...indicators, ...newIndicators],
        isFetching: false,
        page: page + 1
      };
    }
    case 'startLoading': {
      return {
        ...state,
        isLoading: true
      };
    }
    case 'finishLoading': {
      return {
        ...state,
        isLoading: false
      };
    }
    case 'uploadData': {
      return {
        ...state,
        chartData: newChartData
      };
    }
    case 'addCountry': {
      return {
        ...state,
        chosenCountries: chosenCountries.push(SelectedCountry)
      };
    }
    // quitCountry case is under construction, yet:
    case 'quitCountry': {
      return {
        ...state,
        chosenCountries: chosenCountries.filter(el => el.value !== e.value)
      };
    }
    default:
      return state;
  }
}

const initialState = {
  chosenCountries: [],
  indicators: [],
  isFetching: false,
  isLoading: false,
  chartData:{}
};

const App = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { chosenCountries, indicators, isFetching, isLoading, chartData } = state;

  const [options, setOptions] = useState([])
  


  useEffect(() => {
    async function fetchData() {
      const data = await fetchThis("https://restcountries.eu/rest/v2/all");
      // Create a list of all countries that will be shown:
      const newOptions = data.map((el) => {
        const newElement = {value: el.name, id: el.alpha3Code, label: el.name};
        return newElement;
      });
      setOptions(newOptions);

    }
    fetchData();
  }, []);

  return (
    <Router>
      <ThemeProvider theme={{ mainColor: '#FF5A5F' }} >
      <SmartContext.Provider value={{options, setOptions, dispatch}}>
        <div>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route
              path="/indicator/:country/:indicatorId"
              component={Indicator}
            />
            <Route path="*" component={FourOhFour} />
          </Switch>
        </div>
      </SmartContext.Provider>
      </ThemeProvider>
     
    </Router>
  );
};

export default App;
