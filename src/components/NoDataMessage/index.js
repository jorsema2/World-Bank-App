import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MainContent, StyledButton } from "./style";
import { SmartContext } from "../../App";

const NoDataMessage = (props) => {
  const { countries, appDispatch } = useContext(SmartContext);

  function changeToChina() {
    // We only want to show China, so we empty the array of countries
    props.setSelected([]);
    const selectedCountry = countries.find((obj) => obj.id === "CHN");
    appDispatch({ type: "selectedCountry", payload: selectedCountry });
  }

  return (
    <MainContent>
      <h3>No data for this indicator</h3>
      <br></br>
      <p>Unfortunately, this API has a lot of indicators without data. </p>
      <p>
        To save you time looking for a valid indicator, I suggest you to use the
        following:
      </p>
      <Link to="/indicator/CHN/SP.POP.TOTL">
        <StyledButton onClick={() => changeToChina()}>
          Population, total (China)
        </StyledButton>
      </Link>
    </MainContent>
  );
};

export default NoDataMessage;
