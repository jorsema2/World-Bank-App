import React, { useState, useEffect, useReducer } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { appReducer, appInitialState } from "./reducers/appReducer";
import { Home } from "./pages/Home";
import ChartPage from "./pages/ChartPage";
import FourOhFour from "./components/FourOhFour";
import getCountries from "./utils/getCountries";
import Navigation from './components/Navigation'

export const SmartContext = React.createContext();

const App = () => {
  const [appState, appDispatch] = useReducer(appReducer, appInitialState);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    async function addCountries() {
      const newCountries = await getCountries();
      setCountries(newCountries);
    }
    addCountries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Router>
        <ThemeProvider theme={{ mainColor: "#FF5A5F" }}>
          <SmartContext.Provider
            value={{ countries, setCountries, appState, appDispatch }}
          >
            <div>
              <Navigation />
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
