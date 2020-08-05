import React, { useState } from "react";
import Searcher from "./components/Searcher"
import CountriesList from "./components/CountriesList"

const App = () => {
    const [countries, setCountries] = useState([]);
    return(
        <div>
            <h1>World Bank App</h1>
            <Searcher setCountries={setCountries} countries={countries} />
            <CountriesList countries={countries} setCountries={setCountries} />
        </div>
    )
}

export default App;