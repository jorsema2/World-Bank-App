import React from "react";
import Dropdown from '../../../node_modules/react-dropdown';
import '../../../node_modules/react-dropdown/style.css';

const CountriesList = (props) => {

  return (
    <div>
      <Dropdown options={props.options} onChange={Dropdown._onSelect} value={props.options[0]} placeholder="Select a country" />
    </div>
  );

};

export default CountriesList;