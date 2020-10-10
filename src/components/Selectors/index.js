import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import {SmartContext} from "../../App";
import MultiSelectSort from "../../components/SelectMoreCountries";
import groupedIndicators from "../../utils/groupedIndicators";
import IndicatorsList from "../../components/IndicatorsList";

const Selectors = (props) => {
  const {appState, appDispatch} = useContext(SmartContext);
  const [areIndicatorsShown, setIndicatorsShown] = useState(false);

  useEffect(() => {
    appDispatch({ type: "resetIndicators"})
  }, [areIndicatorsShown])

  const changeIndicator = (newIndicator) => {

    const hasSearch = props.search && props.search.compareTo;

    const otherCountries = hasSearch ? `?compareTo=${props.search.compareTo}` : '';

    props.history.push(
      `/indicator/${appState.firstCountry.id}/${newIndicator.id}/${otherCountries}`
    );
  };

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
        <h3>Recommended indicators</h3>
        <Select options={groupedIndicators} onChange={changeIndicator} />
      </div>
      <div>
        <button onClick={() => setIndicatorsShown(!areIndicatorsShown)}>
          All indicators
        </button>
      </div>
      {areIndicatorsShown && (
        <div>
          <IndicatorsList search={props.search} />
        </div>
      )}
    </div>
  );
};

export default Selectors;
