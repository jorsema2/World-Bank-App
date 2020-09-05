import React, { useState, useEffect, useReducer } from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {ThemeProvider} from 'styled-components'
import {Home} from "./pages/Home";
import ChartPage from "./pages/Chart";
import FourOhFour from "./components/FourOhFour";
import fetchOptions from "./utils/fetchCountries";


export const SmartContext = React.createContext();

const initialState = {
  chosenCountry: null,
  indicators: [],
  isFetching: false,
  isLoading: false,
  page: 1,
  chartData: {}
};

export function appReducer(state, action) {
  switch (action.type) {
    case 'selectedCountry': {
      return {
        ...state,
        chosenCountry: action.payload
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
    case 'finishIndicatorsFetch': {
      return {
        ...state,
        indicators: [...state.indicators, ...action.payload],
        isFetching: false,
        page: state.page + 1
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
        chartData: action.payload
      };
    }
    default:
      return state;
  }
}


const App = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [options, setOptions] = useState([]); 


  useEffect(() => {
    async function addOptions() {
      const newOptions = await fetchOptions();
      setOptions(newOptions);
    }
    addOptions();
  }, []);

  return (
    <Router>
      <ThemeProvider theme={{ mainColor: '#FF5A5F' }} >
      <SmartContext.Provider value={{options, setOptions, state, dispatch}}>
        <div>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route
              path="/indicator/:country/:indicatorId"
              component={ChartPage}
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
