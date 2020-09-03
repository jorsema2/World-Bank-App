import React, { useState, useEffect, useReducer } from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {ThemeProvider} from 'styled-components'
import {Home} from "./pages/Home";
import Indicator from "./pages/Indicator";
import FourOhFour from "./components/FourOhFour";
import fetchOptions from "./utils/fetchCountries";


export const SmartContext = React.createContext();

const initialState = {
  chosenCountries: [],
  indicators: [],
  isFetching: false,
  isLoading: false,
  page: 1,
  chartData: {}
};

export function appReducer(state, action) {
  switch (action.type) {
    case 'firstCountry': {
      return {
        ...state,
        chosenCountries: [action.payload]
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
    case 'addCountry': {
      return {
        ...state,
        chosenCountries: action.payload
      };
    }
    // quitCountry case is under construction, yet:
    // case 'quitCountry': {
    //   return {
    //     ...state,
    //     chosenCountries: chosenCountries.filter(el => el.value !== e.value)
    //   };
    // }
    default:
      return state;
  }
}


const App = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [options, setOptions] = useState([])  


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
