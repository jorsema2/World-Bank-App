import React, { useState, useEffect } from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {ThemeProvider} from 'styled-components'
import {Home} from "./pages/Home/index.js";
import Indicator from "./pages/Indicator";
import FourOhFour from "./components/FourOhFour/index.js";
import fetchThis from "./utils/fetcher";


export const SmartContext = React.createContext();

const App = () => {
  const [options, setOptions] = useState([])
  const [indicators, setIndicators] = useState([]);

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
      <SmartContext.Provider value={{options, setOptions, indicators, setIndicators}}>
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
