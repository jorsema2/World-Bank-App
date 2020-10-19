import React, { useContext } from "react";
import Select from "react-select";
import IndicatorsList from "../../components/IndicatorsList";
import {SmartContext} from "../../App";

export const Home = () => {
  const {countries, appState, appDispatch} = useContext(SmartContext);

  function handleChange(e) {
    const selectedCountry = countries.find((obj) => obj.value === e.value);
    appDispatch({type: 'selectedCountry', payload: selectedCountry});
    appDispatch({type: 'resetIndicators', payload: selectedCountry});
  }

  return (
    <div>
      <Select
        value={appState.firstCountry}
        options={countries}
        onChange={handleChange}
      />
      {appState.firstCountry && <IndicatorsList />}
    </div>
  );
};
