import React  from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './pages/Home'
import Indicator from './pages/Indicator'

const FourOhFour = () => <div>Not found</div>




const App = () => {
 
  return (
    <Router>
    <div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/indicator/:country/:indicatorId" component={Indicator} />
        <Route path='*' >
          <FourOhFour />
        </Route>
      </Switch>
    </div>
  </Router>
  );
};

export default App;
