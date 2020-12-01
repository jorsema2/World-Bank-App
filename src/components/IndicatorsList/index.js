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
    console.log("here");
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

  return (
    <Container ref={scrollRef}>
      {appState.indicators.map((indicator) => (
        <Link
          to={`/indicator/${appState.firstCountry.id}/${indicator.id}/${otherCountries}`}
        >
          <StyledButton key={Math.random() + "-" + Math.random()}>
            {indicator.name}
          </StyledButton>
        </Link>
      ))}
      {appState.isFetching && (
        <LoadingMessage>
          <p>Loading more indicators...</p>
        </LoadingMessage>
      )}
      {appState.indicators.length === 0 && !appState.isFetching && (
        <LoadingMessage>
          <p>Loading indicators...</p>
        </LoadingMessage>
      )}
    </Container>
  );
};

export default IndicatorsList;
