import React, { useState } from "react";
import modifyString from "../../utils/modifyString";
import countryFilterer from "../../utils/countryFilterer";

const Searcher = (props) => {
  const [value, setValue] = useState("");

  function handleChange(e) {
    const newValue = modifyString(e.target.value);
    setValue(newValue);
    countryFilterer(value, props);
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