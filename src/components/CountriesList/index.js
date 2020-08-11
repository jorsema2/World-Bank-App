import React from "react";
import Dropdown from '../../../node_modules/react-dropdown';
import '../../../node_modules/react-dropdown/style.css';

const CountriesList = (props) => {

  let options;
  let defaultOption;

  props.chosenCountries === [] ? options = props.allCountries.map((el) => el.name) : options = props.chosenCountries.map((el) => el.name);

  defaultOption = options[0];

  console.log("Chosen countries:");
  console.log(props.chosenCountries);
  console.log('hey');

  return (
    <div>
      <Dropdown options={options} onChange={Dropdown._onSelect} value={defaultOption} placeholder="Select a country" />
    </div>
  );
};

export default CountriesList;