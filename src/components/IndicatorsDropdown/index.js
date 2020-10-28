import React, { useEffect, useContext, useCallback } from "react";
import Select from "react-select";
import { SmartContext } from "../../App";
import fetchData from "../../utils/fetchData";

const IndicatorsDropdown = (props) => {
  const { appState, appDispatch } = useContext(SmartContext);

  useEffect(() => {
    fetchMoreIndicators();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMoreIndicators = useCallback(() => {
    setTimeout(async () => {
      const data = await fetchData(
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
    }, 1000);
  }, [appDispatch, appState.page]);

  function handleScroll() {
    appDispatch({ type: "startIndicatorsFetch" });
    fetchMoreIndicators();
  }

  const changeIndicator = (newIndicator) => {
    const hasSearch = props.search && props.search.compareTo;

    const otherCountries = hasSearch
      ? `?compareTo=${props.search.compareTo}`
      : "";

    props.history.push(
      `/indicator/${props.currentCountry}/${newIndicator.id}/${otherCountries}`
    );
  };

  return (
    <Select
      {...props}
      placeholder={"Change indicator..."}
      options={appState.indicators}
      onChange={changeIndicator}
      onMenuScrollToBottom={handleScroll}
    />
  );
};

export default IndicatorsDropdown;
