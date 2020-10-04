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

  const onChange = (selectedOptions) => {

    const hasSearch = props.search && props.search.compareTo;

    const otherCountries = hasSearch ? `?compareTo=${props.search.compareTo}` : '';

    props.history.push(
      `/indicator/${appState.firstCountry.id}/${selectedOptions.id}/${otherCountries}`
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
        <h3>Indicators by topic</h3>
        <Select options={groupedIndicators} onChange={onChange} />
      </div>
      <div>
        <button onClick={() => setIndicatorsShown(!areIndicatorsShown)}>
          Show/Hide indicators
        </button>
      </div>
      {areIndicatorsShown && (
        <div>
          <h3>All indicators</h3>
          <IndicatorsList search={props.search} />
        </div>
      )}
    </div>
  );
};

export default Selectors;
