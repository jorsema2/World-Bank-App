import React, { useEffect } from 'react';
import fetchThis from '../../utils/fetcher';

const CountriesList = (props) => {
    useEffect(() => { fetchThis(props) }, []);
    const EachCountry = props.allCountries.map((el) => <li key={Math.random() - Math.random()}>{el.name}</li>);

    return(
        <div>
            <ul>
            {EachCountry}
            </ul>
        </div>
    )
}

export default CountriesList;