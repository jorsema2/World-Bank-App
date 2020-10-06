import React, { useContext } from 'react';
import {Link} from "react-router-dom";
import {SmartContext} from "../../App";

const NoDataMessage = (props) => {
    const { options, appDispatch } = useContext(SmartContext);

    function changeToChina() {
        // We only want to show China, so we empty the array of countries
        props.setSelected([]);
        const selectedCountry = options.find((obj) => obj.id === "CHN");
        appDispatch({type: 'selectedCountry', payload: selectedCountry});
    }

    return(
        <div>
            <h3>No data for this indicator</h3>
            <br></br>
            <p>Unfortunately, this API has a lot of indicators without data. To save you time looking for a valid indicator, I suggest you to use the following:</p>
            <Link to="/indicator/CHN/SP.POP.TOTL"><button onClick={() => changeToChina()}>Population, total (China)</button></Link>
        </div>
    )
}

export default NoDataMessage;