import styled from "styled-components";
import { Button, Slider } from "antd";
import IndicatorsDropdown from "../../components/IndicatorsDropdown";
import { MaxWidthContainer } from "../../components/UI/ui.styles";

export const MainContent = styled.div`
  height: 82vh;
`;

export const StyledLayout = styled(MaxWidthContainer)`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${(props) => `
  background-color:${props.theme.main};
  box-shadow: ${props.theme.boxShadow};
  color: ${props.theme.color};
`}
`;

export const IndicatorName = styled.h2`
  color: blue;
  font-familiy: Arial;
  display: flex;
  justify-content: center;
  margin: 1rem;
  font-size: 2rem;
  ${(props) => `
  color: ${props.theme.secondary};
`}
`;

export const ContainerRow = styled.div`
  height: 85%;
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

export const StyledButton = styled(Button)`
  ${(props) => `
background-color:${props.theme.secondBackground};
color: ${props.theme.secondary};
borderColor: ${props.theme.border}
`}
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

export const DefaultYear = styled.h3`
  ${(props) => `
color: ${props.theme.secondary};
`}
`;

export const StyledSlider = styled(Slider)`
  width: 80%;
`;

export const ContentRightContainer = styled.div`
  height: auto;
  width: 33.33%;
  display: flex;
  flex-direction: column;
  margin-left: 24px;
`;

export const SectionHeader = styled.h3`
  ${(props) => `
color: ${props.theme.secondary};
`}
`;

export const MultiSelectContainer = styled.div`
  padding: 8px;
`;

