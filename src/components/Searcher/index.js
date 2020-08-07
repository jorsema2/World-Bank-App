import React, { useState } from "react";
import modifyString from "../../utils/modifyString";
import countryFilterer from "../../utils/countryFilterer";

const Searcher = (props) => {
  const [value, setValue] = useState("");

  function handleChange(e) {
    const lowerCaseValue = value.toLowerCase();
    countryFilterer(lowerCaseValue, props);
    const newValue = modifyString(e.target.value);
    setValue(newValue);
  }

  function handleForm(e) {
    e.preventDefault();
    setValue("");
  }

  return (
    <form onSubmit={handleForm}>
      <input onChange={handleChange} value={value}></input>
    </form>
  );
};

export default Searcher;