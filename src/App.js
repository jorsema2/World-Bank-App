import React, {useState} from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {Home} from "./pages/Home/index.js";
import Indicator from "./pages/Indicator";
import FourOhFour from "./components/FourOhFour/index.js";
import {ThemeProvider} from 'styled-components'

export const SmartContext = React.createContext();

const App = () => {
  const [options, setOptions] = useState([])
  const [indicators, setIndicators] = useState([]);

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
