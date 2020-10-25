import React, { useState, useEffect, useReducer } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider,createGlobalStyle } from "styled-components";
import { darkTheme, lightTheme } from "./themes";
import { appReducer, appInitialState } from "./reducers/appReducer";
import Navigation from "./components/Navigation";
import { Home } from "./pages/Home";
import ChartPage from "./pages/ChartPage";
import FourOhFour from "./components/FourOhFour";
import Footer from "./components/Footer";
import fetchData from "./utils/fetchData";

export const SmartContext = React.createContext();

const GlobalStyle = createGlobalStyle`
  body {
    padding-top: 80px;
  }
`

const App = () => {
  const [appState, appDispatch] = useReducer(appReducer, appInitialState);
  const [countries, setCountries] = useState([]);

  async function getCountries() {
    const data = await fetchData("https://restcountries.eu/rest/v2/all");

    const newCountries = data.map((el) => {
      const newElement = {
        value: el.name,
        id: el.alpha3Code,
        label: el.name,
        isDisabled: false,
      };
      return newElement;
    });
    return newCountries;
  }

  useEffect(() => {
    async function addCountries() {
      const newCountries = await getCountries();
      setCountries(newCountries);
    }
    addCountries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <ThemeProvider theme={appState.isLight ? lightTheme : darkTheme}>
        <GlobalStyle />
        <SmartContext.Provider
          value={{ countries, setCountries, appState, appDispatch }}
        >
          <Navigation />
          <Switch className={"intruder"}>
            <Route exact path="/">
              <Home />
            </Route>
            <Route
              path="/indicator/:country/:indicatorId"
              component={ChartPage}
            />
            <Route path="*" component={FourOhFour} />
          </Switch>
          <Footer />
        </SmartContext.Provider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
