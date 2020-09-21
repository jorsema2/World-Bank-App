import React, { useState, useEffect, useReducer } from "react";
import Select from "react-select";
import { appReducer, appInitialState } from "../../Reducers/appReducer";
import MultiSelectSort from "../../components/SelectMoreCountries";
import groupedIndicators from "../../utils/groupedIndicators";
import IndicatorsList from "../../components/IndicatorsList";

const Selectors = (props) => {
  const [appState, appDispatch] = useReducer(appReducer, appInitialState);
  const [areIndicatorsShown, setIndicatorsShown] = useState(false);

  useEffect(() => {
    appDispatch({ type: "resetIndicators"})
  }, [areIndicatorsShown])

  return (
    <div>
      <div>
        <p>Add another country to the chart</p>
        <MultiSelectSort
          filteredOptions={props.filteredOptions}
          selected={props.selected}
          setSelected={props.setSelected}
        />
      </div>
      <div>
        <h3>Indicators by topic</h3>
        <Select options={groupedIndicators} />
      </div>
      <div>
        <button onClick={() => setIndicatorsShown(!areIndicatorsShown)}>Show/Hide indicators</button>
      </div>
      {/* Indicators links do not work properly */}
      {areIndicatorsShown && (
        <div>
          <h3>All indicators</h3>
          <IndicatorsList />
        </div>
      )}
    </div>
  );
};

export default Selectors;
