import React, { useContext } from "react";
import styled from "styled-components";
import Select from "react-select";
import IndicatorsList from "../../components/IndicatorsList/index.js";
import {SmartContext} from "../../App";

const Title = styled.h1`
  color: ${(props) => props.theme.mainColor};
  font-familiy: Arial;
  display: flex;
  justify-content: center;
  margin-bottom: 3 rem;
`;

export const Home = () => {
  const {options, dispatch} = useContext(SmartContext);

  function handleChange(e) {
    const selectedCountry = options.find((obj) => obj.value === e.value);
    dispatch({type: 'firstCountry', selectedCountry});
  }

  return (
    <div>
      <Title>My React App</Title>
      <Select
        value={chosenCountries[0]}
        options={options}
        onChange={handleChange}
      />
      {chosenCountries && <IndicatorsList />}
    </div>
  );
};
