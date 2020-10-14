import styled from "styled-components";
import { Layout, Slider } from "antd";

const { Header, Content, Footer } = Layout;

export const StyledLayout = styled(Layout)`
  height: 1024px;
  max-width: 1280px;
  margin: 0 auto;
`;

export const StyledHeader = styled(Header)`
  background-color: green;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export const AppTitle = styled.div`
  width: 33%;
  display: flex;
  flex-direction: row;
  font-size: 3rem;
`;

export const NavMenu = styled.div`
  width: 33%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export const NavMenuItem = styled.a`
  color: black;
  font-size: 1.25rem;
`;

export const StyledContent = styled(Content)`
  background-color: yellow;
  padding: 1%;
`;

export const IndicatorName = styled.h2`
  color: blue;
  font-familiy: Arial;
  display: flex;
  justify-content: center;
  margin: 1rem;
  font-size: 2rem; ;
`;

export const ContainerRow = styled.div`
  height: 80%;
  display: flex;
  flex-direction: row;
`;

export const ContentLeftContainer = styled.div`
  width: 66%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 1rem;
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
  width: 33%;
  display: flex;
  flex-direction: column;
  display: flex;
`;

export const StyledFooter = styled(Footer)`
  background-color: pink;
  display: flex;
  flex-direction: column;
`;
