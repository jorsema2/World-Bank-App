import React, { useState, useEffect } from 'react';
import fetchThis from "../utils/fetcher";

const List = (props) => {
  const [isFetching, setIsFetching] = useState(false);

  /* Check fetchIndicators function, DONE
  add async await to the promise, DONE
  add page hook, DONE
  interpolate string for link, DONE
  move baseURL (http://api.worldbank.org/v2/) to fetchThis, NO! IT BREAKS ANOTHER FETCH!
  eliminate ID from name (look at Cristian's WhatsApp message), MAYBE IT'S A BAD IDEA
  */

  useEffect(() => {
    fetchMoreIndicators();
  }, [props.chosenCountry]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    fetchMoreIndicators();
  }, [isFetching]);

  function handleScroll() {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
    setIsFetching(true);
  }

  function fetchMoreIndicators() {
    setTimeout(async () => {
      const data = await fetchThis(`http://api.worldbank.org/v2/indicator?format=json&page=+${props.page}`);
      const newIndicators = data.map((el) => {
        const newElement = { name: el.name, id: el.id, description: el.sourceNote }
        return newElement;
      })
      props.setIndicators([...props.indicators, ...newIndicators]);
      setIsFetching(false);
    }, 2000);
    props.setPage(props.page + 1);
  }

  return (
    <>
      <ul className="list-group mb-2">
        {props.indicators.map(indicator => <li key={indicator.id} className="list-group-item">{indicator.name}</li>)}
      </ul>
      {isFetching && 'Loading more indicators...'}
      {props.indicators.length === 0 && 'Loading indicators...'}
    </>
  );
};

export default List;