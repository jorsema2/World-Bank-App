import React, { useEffect } from "react";
import fetchThis from "../../utils/fetcher";

const CountriesList = (props) => {
  useEffect(() => {
    fetchThis(props);
  }, []);

  console.log("Chosen countries:");
  console.log(props.chosenCountries);

  return (
    <div>
      <ul>
        {props.chosenCountries === [] &&
          props.allCountries.map((el) => (
            <li key={Math.random() - Math.random()}>{el.name}</li>
          ))}

        {props.chosenCountries !== [] &&
          props.chosenCountries.map((el) => (
            <li key={Math.random() - Math.random()}>{el.name}</li>
          ))}
      </ul>
    </div>
  );
};

export default CountriesList;