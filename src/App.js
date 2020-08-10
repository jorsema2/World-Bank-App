import React, { useState, useEffect } from "react";
import fetchThis from "./utils/fetcher"
import Searcher from "./components/Searcher";
import CountriesList from "./components/CountriesList"
import '../node_modules/react-dropdown/style.css';

const App = () => {
    const [allCountries, setAllCountries] = useState([]);
    const [chosenCountries, setChosenCountries] = useState([]);

    useEffect(() => {
        fetchThis(setAllCountries);
    }, []);

    return(
        <div>
            <h1>World Bank App</h1>
            <Searcher setAllCountries={setAllCountries} allCountries={allCountries} chosenCountries={chosenCountries} setChosenCountries={setChosenCountries} />
            <CountriesList allCountries={allCountries} setCountries={setAllCountries} chosenCountries={chosenCountries} setChosenCountries={setChosenCountries} />
        </div>
    )
}

export default App;