import React from 'react';
import {Link} from "react-router-dom";


const NoDataMessage = () => {
    return(
        <div>
            <h3>No data for this indicator</h3>
            <br></br>
            <p>Unfortunately, this API has a lot of indicators without data. To save you time looking for a valid indicator, I suggest you to use the following:</p>
            <Link to="/indicator/chn/SP.POP.TOTL"><button>Population, total (China)</button></Link>
        </div>
    )
}

export default NoDataMessage;