import React from "react";
import { Container, StyledBar, StyledLine } from "./style";

const Chart = (props) => {
  return (
    <Container>
      {props.chartData && props.isLine && (
        <StyledLine
          data={props.chartData}
          options={{ maintainAspectRatio: false }}
        />
      )}
      {props.chartData && !props.isLine && (
        <StyledBar
          data={props.chartData}
          options={{ maintainAspectRatio: false }}
        />
      )}
    </Container>
  );
};

export default Chart;
