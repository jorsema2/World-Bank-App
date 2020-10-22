import styled from "styled-components";
import { Button, Slider } from "antd";
import IndicatorsDropdown from "../../components/IndicatorsDropdown";
import { MaxWidthContainer } from "../../components/UI/ui.styles";

export const StyledLayout = styled(MaxWidthContainer)`
  min-height: calc(100vh - 75px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${(props) => `
  background-color:${props.theme.MainBodyBackgroundColor};
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
  color: ${props.theme.color};
  `}
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

export const StyledButton = styled(Button)`
  ${(props) => `
background-color:${props.theme.MainBodyBackgroundColor};
color: ${props.theme.color};
borderColor: ${props.theme.borderColor}
`}
`;

export const StyledIndicatorsDropdown = styled(IndicatorsDropdown)`
  width: 50%;
  ${(props) => `
  background-color:${props.theme.MainBodyBackgroundColor};
  color: ${props.theme.color};
  borderColor: ${props.theme.borderColor}
  `}
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
  ${(props) => `
  color: ${props.theme.color};
  `}
`;

export const ContentRightContainer = styled.div`
  width: 33.33%;
  display: flex;
  flex-direction: column;
  display: flex;
  margin-left: 24px;
`;
