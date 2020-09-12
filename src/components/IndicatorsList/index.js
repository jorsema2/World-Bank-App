import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import fetchThis from "../../utils/fetcher";
import {SmartContext} from "../../App";

const StyledLi = styled.li`
  background-color: lightgrey;
  border-radius: 1px solid grey;
  font-family: Arial;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  list-style-type: none;
  margin-bottom: 2rem;
`;

const IndicatorsList = () => {
  const {appState, appDispatch} = useContext(SmartContext);

  useEffect(() => {
    fetchMoreIndicators();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appState.firstCountry]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!appState.isFetching) return;
    fetchMoreIndicators();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appState.isFetching]);

  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
    appDispatch({type: 'startIndicatorsFetch'})
    return;    
  }

  function fetchMoreIndicators() {
    setTimeout(async () => {
      const data = await fetchThis(
        `http://api.worldbank.org/v2/indicator?format=json&page=+${appState.page}`
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
      
      appDispatch({type: 'finishIndicatorsFetch', payload: newIndicators})
    }, 2000);
  }

  return (
    <>
      <ul className="list-group mb-2 cool-list">
        {appState.indicators.map((indicator) => (
          <StyledLi key={Math.random() + "-" + Math.random()}>
            <Link to={`/indicator/${appState.firstCountry.id}/${indicator.id}`}>
              {indicator.name}
            </Link>
          </StyledLi>
        ))}
      </ul>
      {appState.isFetching && "Loading more indicators..."}
      {appState.indicators.length === 0 && !appState.isFetching && "Loading indicators..."}
    </>
  );
};

export default IndicatorsList;
