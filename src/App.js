import React, { useState } from "react";
import Searcher from "./components/Searcher"
import CountriesList from "./components/CountriesList"

const App = () => {
    const [allCountries, setAllCountries] = useState([]);
    return(
        <div>
            <h1>World Bank App</h1>
            <Searcher setAllCountries={setAllCountries} allCountries={allCountries} />
            <CountriesList allCountries={allCountries} setCountries={setAllCountries} />
        </div>
    )
}

export default App;