import React from "react";
import styled from "styled-components";
import { ContainerHeightTotal } from "./style"
import { Line, Bar } from "react-chartjs-2";

export const StyledLine = styled(Line)`
  height: 100%;
  background-color: blue;
`;
export const StyledBar = styled(Bar)`
  height: 100%;
`;

const Chart = (props) => {
  return (
    <ContainerHeightTotal>
      {props.chartData && (
        <ContainerHeightTotal>
          {props.isLine && (
            <StyledLine
              data={props.chartData}
              width={100}
              options={{ maintainAspectRatio: false }}
            />
          )}
          {!props.isLine && (
            <StyledBar
              data={props.chartData}
              width={100}
              options={{ maintainAspectRatio: false }}
            />
          )}
        </ContainerHeightTotal>
      )}
    </ContainerHeightTotal>
  );
};

export default Chart;
