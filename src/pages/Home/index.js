import React, { useState, useEffect, useContext } from "react";
import IndicatorsList from "../../components/IndicatorsList";
import { SmartContext } from "../../App";
import img0 from "./../../assets/backgroundImages/backgroundImage0.jpg";
import img1 from "./../../assets/backgroundImages/backgroundImage1.jpg";
import img2 from "./../../assets/backgroundImages/backgroundImage2.jpg";
import { Container, StyledSelect, MainContent } from "./style";

const images = [img0, img1, img2]



export const Home = () => {
  const [backgroundImage, setBackgroundImage] = useState("");
  const { countries, appState, appDispatch } = useContext(SmartContext);



  useEffect(() => {
    const index = Math.floor(Math.random() * 3);
    setBackgroundImage(images[index]);
  }, []);

  function handleChange(e) {
    const selectedCountry = countries.find((obj) => obj.value === e.value);
    appDispatch({ type: "selectedCountry", payload: selectedCountry });
    appDispatch({ type: "resetIndicators" });
  }

  return (
    <MainContent backgroundImage={backgroundImage}>
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
