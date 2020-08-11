import React, { useState, useEffect } from "react";
import fetchThis from "./utils/fetcher"
import Searcher from "./components/Searcher";
import CountriesList from "./components/CountriesList"
import '../node_modules/react-dropdown/style.css';

const App = () => {
    const [allCountries, setAllCountries] = useState([]);
    const [chosenCountries, setChosenCountries] = useState([]);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        fetchThis(setAllCountries);
    }, []);

    return(
        <div>
            <h1>World Bank App</h1>
            <Searcher allCountries={allCountries}  setAllCountries={setAllCountries} chosenCountries={chosenCountries} setChosenCountries={setChosenCountries} setOptions={setOptions} />
            <CountriesList options={options} />
        </div>
    )
}

export default App;