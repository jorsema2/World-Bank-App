import React, {useState, useContext} from "react";
import styled from "styled-components";
import Select from "react-select";
import IndicatorsList from "../../components/IndicatorsList/index.js";
import {SmartContext} from "../../App";

const Title = styled.h1`
  color: ${(props) => props.theme.mainColor};
  font-familiy: Arial;
  display: flex;
  justify-content: center;
  margin-bottom: 3 rem;
`;

export const Home = () => {
  const {options, setIndicators} = useContext(SmartContext);
  const [chosenCountry, setChosenCountry] = useState();
  const [page, setPage] = useState(1);

  function handleChange(e) {
    setPage(1);
    setIndicators([]);
    const selectedValue = options.find((obj) => obj.value === e.value);
    setChosenCountry(selectedValue);
  }

  return (
    <div>
      <Title>My React App</Title>
      <Select value={chosenCountry} options={options} onChange={handleChange} />
      {chosenCountry && (
        <IndicatorsList
          options={options}
          chosenCountry={chosenCountry}
          page={page}
          setPage={setPage}
        />
      )}
    </div>
  );
};
