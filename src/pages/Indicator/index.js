import React from "react";

const IndicatorPage = (props) => {
  console.log(props);

  return <div>{JSON.stringify(props.match.params, null, 2)}</div>;
};

export default IndicatorPage;
