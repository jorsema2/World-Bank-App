import styled from "styled-components";
import { Button, Slider } from "antd";
import IndicatorsDropdown from "../../components/IndicatorsDropdown";
import { MaxWidthContainer } from "../../components/UI/ui.styles";

export const MainContent = styled.div`
  min-height: calc(100vh - 80px - 112px);
  background-color: ${(props) => props.theme.main};
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const StyledLayout = styled(MaxWidthContainer)`
  display: flex;
  flex-direction: column;
  flex: 1;
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

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SelectorsContainer = styled.div`
  display: flex;
  min-width: 66%;
  margin-right: 16px;
`;

export const StyledButton = styled(Button)`
  border-radius: 4px;
  height: 38px;
  ${(props) => `
background-color: #345995;
color: ${props.theme.main};
border-color: #345995;
`}
`;

export const StyledIndicatorsDropdown = styled(IndicatorsDropdown)`
  width: 350px;
  margin-right: 16px;
`;

export const ChartContainer = styled.div`
  height: 80%;
`;

export const SliderContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: baseline;
  margin-top: 24px;
  padding-top: 32px;
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
  font-size: 24px;
  font-weight: bold;
  ${(props) => `
color: ${props.theme.secondary};
`}
`;
