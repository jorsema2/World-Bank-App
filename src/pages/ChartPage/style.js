import styled from "styled-components";
import {Slider} from "antd";
import IndicatorsDropdown from "../../components/IndicatorsDropdown";
import {MaxWidthContainer} from "../../components/UI/ui.styles";

export const StyledLayout = styled(MaxWidthContainer)`
  min-height: calc(100vh - 75px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
