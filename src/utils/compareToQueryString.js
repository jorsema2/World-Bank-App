import queryString from "query-string";

// Modify query string in ChartPage:
function modifyQueryString(arrayOfIDs, props) {
  const query = { compareTo: arrayOfIDs };

  props.history.push(
    `/indicator/${props.match.params.country}/${
      props.match.params.indicatorId
    }?${queryString.stringify(query, { arrayFormat: "comma" })}`
  );
}

export default modifyQueryString;