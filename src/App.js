import React  from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './pages/Home'
import Indicator from './pages/Indicator'
import FourOhFour from "./components/FourOhFour/index.js"

const App = () => {
 
  return (
    <Router>
    <div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/indicator/:country/:indicatorId" component={Indicator} />
        <Route path="*" component={FourOhFour} />
      </Switch>
    </div>
  </Router>
  );
};

export default App;
