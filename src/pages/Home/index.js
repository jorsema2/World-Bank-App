import React, { useContext } from "react";
import Select from "react-select";
import IndicatorsList from "../../components/IndicatorsList";
import {SmartContext} from "../../App";
import { MainContent } from "./style";

export const Home = () => {
  const {countries, appState, appDispatch} = useContext(SmartContext);

  function handleChange(e) {
    const selectedCountry = countries.find((obj) => obj.value === e.value);
    appDispatch({type: 'selectedCountry', payload: selectedCountry});
    appDispatch({type: 'resetIndicators'});
  }

  return (
    <MainContent>
      <Select
        value={appState.firstCountry}
        options={countries}
        onChange={handleChange}
      />
      {appState.firstCountry && <IndicatorsList />}
    </MainContent>
  );
};
