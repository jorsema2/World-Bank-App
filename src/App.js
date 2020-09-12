import React, { useState, useEffect, useReducer } from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {ThemeProvider} from 'styled-components'
import { appReducer, appInitialState } from "./Reducers/appReducer"
import {Home} from "./pages/Home";
import ChartPage from "./pages/ChartPage";
import FourOhFour from "./components/FourOhFour";
import fetchOptions from "./utils/fetchCountries";

export const SmartContext = React.createContext();

const App = () => {
  const [appState, appDispatch] = useReducer(appReducer, appInitialState);
  const [options, setOptions] = useState([]);
  

  useEffect(() => {
    async function addOptions() {
      const newOptions = await fetchOptions();
      setOptions(newOptions);
    }
    addOptions();
  }, []);

  return (
    <div>
      <Router>
        <ThemeProvider theme={{ mainColor: "#FF5A5F" }}>
          <SmartContext.Provider
            value={{ options, setOptions, appState, appDispatch }}
          >
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
    </div>
  );
};

export default App;
