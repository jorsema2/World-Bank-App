import React, { useEffect, useContext, useCallback } from "react";
import Select from "react-select";
import { SmartContext } from "../../App";
import getData from "../../utils/getData";

const IndicatorsDropdown = (props) => {
  const { appState, appDispatch } = useContext(SmartContext);

  const fetchMoreIndicators = useCallback(() => {
    setTimeout(async () => {
      const data = await getData(
        `http://api.worldbank.org/v2/indicator?format=json&page=+${appState.page}`
      );
      // Only the second element of the array has indicators, i.e., what we want:
      const newIndicators = data[1].map((el) => {
        const newElement = {
          name: el.name,
          label: el.name,
          id: el.id,
          description: el.sourceNote,
        };
        return newElement;
      });

      appDispatch({ type: "finishIndicatorsFetch", payload: newIndicators });
    }, 1500);
  }, [appDispatch, appState.page])
  useEffect(() => {
    appDispatch({ type: "startIndicatorsFetch" });
    fetchMoreIndicators();
  }, [appDispatch, fetchMoreIndicators]);

 

  function handleScroll() {
    appDispatch({ type: "startIndicatorsFetch" });
    fetchMoreIndicators();
  }

  const changeIndicator = (newIndicator) => {
    const hasSearch = props.search && props.search.compareTo;

    const otherCountries = hasSearch ? `?compareTo=${props.search.compareTo}` : "";

    props.history.push(
      `/indicator/${props.currentCountry}/${newIndicator.id}/${otherCountries}`
    );
  };

  return <Select {...props} options={appState.indicators} onChange={changeIndicator} onMenuScrollToBottom={handleScroll} />;
};

export default IndicatorsDropdown;
