import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import { SmartContext } from "../../App";
import { Container, StyledButton, LoadingMessage } from "./style";
import fetchData from "../../utils/fetchData";

const IndicatorsList = (props) => {
  const { appState, appDispatch } = useContext(SmartContext);

  useEffect(() => {
    fetchMoreIndicators();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollRef = useBottomScrollListener(handleScroll);

  function handleScroll() {
    appDispatch({ type: "startIndicatorsFetch" });
    fetchMoreIndicators();
    return;
  }

  const hasSearch = props.search && props.search.compareTo;

  const otherCountries = hasSearch
    ? `?compareTo=${props.search.compareTo}`
    : "";

  function fetchMoreIndicators() {
    console.log('here')
    setTimeout(async () => {
      const data = await fetchData(
        `https://api.worldbank.org/v2/indicator?format=json&page=+${appState.page}`
      );
      // Only the second element of the array has indicators, i.e., what we want:
      const newIndicators = data[1].map((el) => {
        const newElement = {
          name: el.name,
          id: el.id,
          description: el.sourceNote,
        };
        return newElement;
      });

      appDispatch({ type: "finishIndicatorsFetch", payload: newIndicators });
    }, 1500);
  }

  console.log("again");

  return (
    <Container ref={scrollRef}>
      {appState.indicators.map((indicator) => (
        <StyledButton key={Math.random() + "-" + Math.random()}>
          <Link
            to={`/indicator/${appState.firstCountry.id}/${indicator.id}/${otherCountries}`}
          >
            {indicator.name}
          </Link>
        </StyledButton>
      ))}
      {appState.isFetching && (
        <LoadingMessage>Loading more indicators...</LoadingMessage>
      )}
      {appState.indicators.length === 0 && !appState.isFetching && (
        <LoadingMessage>Loading indicators...</LoadingMessage>
      )}
    </Container>
  );
};

export default IndicatorsList;
