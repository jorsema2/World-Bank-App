import React, {useState, useEffect, useContext} from "react";
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

const IndicatorsList = (props) => {
  const [isFetching, setIsFetching] = useState(false);
  const {indicators, setIndicators} = useContext(SmartContext);

  useEffect(() => {
    fetchMoreIndicators();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.chosenCountry]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    fetchMoreIndicators();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching]);

  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;
    setIsFetching(true);
  }

  function fetchMoreIndicators() {
    setTimeout(async () => {
      const data = await fetchThis(
        `http://api.worldbank.org/v2/indicator?format=json&page=+${props.page}`
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
      
      setIndicators([...indicators, ...newIndicators]);
      setIsFetching(false);
    }, 2000);
    props.setPage(props.page + 1);
  }

  return (
    <>
      <ul className="list-group mb-2 cool-list">
        {indicators.map((indicator) => (
          <StyledLi key={indicator.id}>
            <Link to={`/indicator/${props.chosenCountry.id}/${indicator.id}`}>
              {indicator.name}
            </Link>
          </StyledLi>
        ))}
      </ul>
      {isFetching && "Loading more indicators..."}
      {indicators.length === 0 && "Loading indicators..."}
    </>
  );
};

export default IndicatorsList;
