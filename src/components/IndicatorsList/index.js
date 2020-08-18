import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import fetchThis from "../../utils/fetcher";
import './style.css'

const IndicatorsList = (props) => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    fetchMoreIndicators();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.chosenCountry]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    fetchMoreIndicators();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <ul className="list-group mb-2 cool-list">
        {props.indicators.map(indicator => <li key={indicator.id}>
          <Link to={`/indicator/${props.chosenCountry.id}/${indicator.id}`} >
          {indicator.name}
          </Link>
         
        </li>)}
      </ul>
      {isFetching && 'Loading more indicators...'}
      {props.indicators.length === 0 && 'Loading indicators...'}
    </>
  );
};

export default IndicatorsList;