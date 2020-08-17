import React, { useState, useEffect } from 'react';
import fetchThis from "../utils/fetcher";

const List = (props) => {
  const [indicators, setIndicators] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [page, setPage] = useState(1);

  /* Check fetchIndicators function, DONE
  add async await to the promise, DONE
  add page hook, 
  interpolate string for link, 
  move baseURL (http://api.worldbank.org/v2/) to fetchThis, NO! IT BREAKS ANOTHER FETCH!
  eliminate ID from name (look at Cristian's WhatsApp message),
  */

  useEffect(() => {
    fetchMoreIndicators();
  }, []);

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
      const data = await fetchThis("http://api.worldbank.org/v2/indicator?format=json&page=1");
      const newIndicators = data.map((el) => {
        const newElement = { name: el.name, id: el.id, description: el.sourceNote }
        return newElement;
      })
      setIndicators([...indicators, ...newIndicators]);
      setIsFetching(false);
    }, 2000);
  }

  return (
    <>
      <ul className="list-group mb-2">
        {indicators.map(indicator => <li key={indicator.id} className="list-group-item">{indicator.name}</li>)}
      </ul>
      {isFetching && 'Fetching more list items...'}
    </>
  );
};

export default List;