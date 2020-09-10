import React, { useContext } from 'react';
import {Link} from "react-router-dom";
import {SmartContext} from "../../App";

const NoDataMessage = () => {
    const { options, dispatch } = useContext(SmartContext);

    // Provokes an error with the react-chartjs library:

    function useChina() {
        const selectedCountry = options.find((obj) => obj.id === "CHN");
        console.log(selectedCountry);
        dispatch({type: 'selectedCountry', payload: selectedCountry});
    }

    return(
        <div>
            <h3>No data for this indicator</h3>
            <br></br>
            <p>Unfortunately, this API has a lot of indicators without data. To save you time looking for a valid indicator, I suggest you to use the following:</p>
            <Link to="/indicator/chn/SP.POP.TOTL"><button onClick={useChina}>Population, total (China)</button></Link>
        </div>
    )
}

export default NoDataMessage;