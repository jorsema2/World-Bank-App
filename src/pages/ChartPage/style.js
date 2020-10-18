import React from "react";
import styled from "styled-components";
import {Layout, Slider} from "antd";
import IndicatorsDropdown from "../../components/IndicatorsDropdown";
import {MaxWidthContainer} from "../../components/UI/ui.styles";

const {Header, Footer} = Layout;

export const StyledLayout = styled(MaxWidthContainer)`
  min-height: calc(100vh - 75px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const StyledHeader = styled(Header)`
  background-color: green;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const AppTitle = styled.div`
  width: 33%;
  display: flex;
  flex-direction: row;
  font-size: 3rem;
`;

export const HeaderMenu = styled.div`
  width: 33%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export const MenuItem = styled.div`
  color: black;
  font-size: 1.25rem;
  display: flex;
  flex-direction: row;
  align-items: baseline;
`;

export const IndicatorName = styled.h2`
  color: blue;
  font-familiy: Arial;
  display: flex;
  justify-content: center;
  margin: 1rem;
  font-size: 2rem;
`;

export const ContainerRow = styled.div`
  height: 80%;
  display: flex;
  flex-direction: row;
`;

export const ContentLeftContainer = styled.div`
  width: 66.66%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StyledIndicatorsDropdown = styled(IndicatorsDropdown)`
  width: 50%;
`;

export const ChartContainer = styled.div`
  height: 80%;
`;

export const SliderContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: baseline;
`;

export const StyledSlider = styled(Slider)`
  width: 80%;
`;

export const ContentRightContainer = styled.div`
  width: 33.33%;
  display: flex;
  flex-direction: column;
  display: flex;
  margin-left: 24px;
`;

export const StyledFooter = styled(Footer)`
  background-color: pink;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const FooterMenu = styled.div`
  display: flex;
  align-items: baseline;
  align-self: flex-end;
  justify-content: space-between;
  width: 50%;
`;
