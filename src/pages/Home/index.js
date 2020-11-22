import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import IndicatorsList from "../../components/IndicatorsList";
import { SmartContext } from "../../App";
import img0 from "./../../assets/backgroundImages/backgroundImage0.jpg";
import img1 from "./../../assets/backgroundImages/backgroundImage1.jpg";
import img2 from "./../../assets/backgroundImages/backgroundImage2.jpg";
import img3 from "./../../assets/backgroundImages/backgroundImage3.jpg";
import { Container, StyledSelect } from "./style";

const images = [img0, img1, img2, img3]

export const Home = () => {
  const [backgroundImage, setBackgroundImage] = useState("");
  const { countries, appState, appDispatch } = useContext(SmartContext);

  const MainContent = styled.div`
  min-height: calc(100vh - 80px - 112px);
  background-image: url(${backgroundImage});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
`;

  useEffect(() => {
    const index = Math.floor(Math.random() * 4);
    setBackgroundImage(images[index]);
  }, []);

  function handleChange(e) {
    const selectedCountry = countries.find((obj) => obj.value === e.value);
    appDispatch({ type: "selectedCountry", payload: selectedCountry });
    appDispatch({ type: "resetIndicators" });
  }

  return (
    <MainContent>
      <Container>
        <StyledSelect
          value={appState.firstCountry}
          options={countries}
          onChange={handleChange}
        />
        {appState.firstCountry && <IndicatorsList />}
      </Container>
    </MainContent>
  );
};
