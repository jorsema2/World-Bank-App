import React, { useEffect } from 'react';
import fetchThis from '../../utils/fetcher';

const EachCountry = (props) => {
   return <li>Hey</li>
}

const CountriesList = (props) => {
    useEffect(() => fetchThis(props));
    console.log(props.countries);

    return(
        <div>
            <ul>
                <EachCountry /> 
            </ul>
        </div>
    )
}

export default CountriesList;