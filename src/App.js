import React, { useState } from "react";
import Searcher from "./components/Searcher"
import CountriesList from "./components/CountriesList"
import Dropdown from '../node_modules/react-dropdown';
import '../node_modules/react-dropdown/style.css';

const App = () => {
    const [allCountries, setAllCountries] = useState([]);
    const [chosenCountries, setChosenCountries] = useState([]);

    return(
        <div>
            <h1>World Bank App</h1>
            <Searcher setAllCountries={setAllCountries} allCountries={allCountries} chosenCountries={chosenCountries} setChosenCountries={setChosenCountries} />
            <Dropdown options={allCountries} onChange={Dropdown._onSelect} value={allCountries[0]} placeholder={allCountries[0]} />
            <CountriesList allCountries={allCountries} setCountries={setAllCountries} chosenCountries={chosenCountries} setChosenCountries={setChosenCountries} />
        </div>
    )
}

export default App;