import React, { useContext } from "react";
import styled from "styled-components";
import Select from "react-select";
import Header from "../../components/Header";
import IndicatorsList from "../../components/IndicatorsList";
import {SmartContext} from "../../App";

const Title = styled.h1`
  color: ${(props) => props.theme.mainColor};
  font-familiy: Arial;
  display: flex;
  justify-content: center;
  margin-bottom: 3 rem;
`;

export const Home = () => {
  const {options, state, dispatch} = useContext(SmartContext);

  function handleChange(e) {
    const selectedCountry = options.find((obj) => obj.value === e.value);
    dispatch({type: 'selectedCountry', payload: selectedCountry});
  }

  return (
    <div>
      <Header />
      <Title>Countries Charts</Title>
      <Select
        value={state.chosenCountry}
        options={options}
        onChange={handleChange}
      />
      {state.chosenCountry && <IndicatorsList />}
    </div>
  );
};
