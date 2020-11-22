import React, { useState, useEffect, useContext } from "react";
import IndicatorsList from "../../components/IndicatorsList";
import { SmartContext } from "../../App";
import img0 from "./../../assets/backgroundImages/backgroundImage0.jpg";
import img1 from "./../../assets/backgroundImages/backgroundImage1.jpg";
import img2 from "./../../assets/backgroundImages/backgroundImage2.jpg";
import img3 from "./../../assets/backgroundImages/backgroundImage3.jpg";
import { Container, StyledSelect, MainContent } from "./style";

const images = [img0, img1, img2, img3]



export const Home = () => {
  const [backgroundImage, setBackgroundImage] = useState("");
  const { countries, appState, appDispatch } = useContext(SmartContext);



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
    <MainContent backgroundImage={backgroundImage}>
      <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.7)'}} />
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
