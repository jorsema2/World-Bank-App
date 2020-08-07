import React, { useState } from "react";
import Searcher from "./components/Searcher"
import CountriesList from "./components/CountriesList"

const App = () => {
    const [allCountries, setAllCountries] = useState([]);
    const [chosenCountries, setChosenCountries] = useState([]);

    return(
        <div>
            <h1>World Bank App</h1>
            <Searcher setAllCountries={setAllCountries} allCountries={allCountries} chosenCountries={chosenCountries} setChosenCountries={setChosenCountries} />
            <CountriesList allCountries={allCountries} setCountries={setAllCountries} chosenCountries={chosenCountries} setChosenCountries={setChosenCountries} />
        </div>
    )
}

export default App;