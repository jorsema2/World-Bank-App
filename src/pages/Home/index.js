import React, { useContext } from "react";
import styled from "styled-components";
import Select from "react-select";
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
  const {countries, appState, appDispatch} = useContext(SmartContext);

  function handleChange(e) {
    const selectedCountry = countries.find((obj) => obj.value === e.value);
    appDispatch({type: 'selectedCountry', payload: selectedCountry});
    appDispatch({type: 'resetIndicators', payload: selectedCountry});
  }

  return (
    <div>
      <Title>World Charts</Title>
      <Select
        value={appState.firstCountry}
        options={countries}
        onChange={handleChange}
      />
      {appState.firstCountry && <IndicatorsList />}
    </div>
  );
};
