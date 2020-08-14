import React, { useState, useEffect } from 'react';
import fetchThis from "../utils/fetcher";

const List = (props) => {
  const [newIndicators, setNewIndicators] = useState([]);
  const [indicators, setIndicators] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    fetchThis(setNewIndicators, "http://api.worldbank.org/v2/indicator?format=json&page=1");
    const chosenIndicators = newIndicators.map((el) => {
      const newElement = { name: el.name, id: el.id, description: el.sourceNote }
      return newElement;
    })
    setIndicators(chosenIndicators);
  }, [props.chosenCountry]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    fetchMoreListItems();
    console.log(indicators);
  }, [isFetching]);

  function handleScroll() {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
    setIsFetching(true);
    console.log(indicators);
  }

  function fetchMoreListItems() {
    setTimeout(() => {
      fetchThis(setNewIndicators, "http://api.worldbank.org/v2/indicator?format=json&page=2");
      const chosenIndicators = newIndicators.map((el) => {
        const newElement = { name: el.name, id: el.id, description: el.sourceNote }
        return newElement;
      })
      const newArray = indicators.concat(chosenIndicators);
      setIndicators(newArray);
      console.log(indicators);
      setIsFetching(false);
    }, 2000);
  }
  
  return (
    <>
      <ul className="list-group mb-2">
        {indicators.map(indicator => <li className="list-group-item">{indicator.name}</li>)}
      </ul>
      {isFetching && 'Fetching more list items...'}
    </>
  );
};

export default List;