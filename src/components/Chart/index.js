import React from "react";
import { Container, StyledBar, StyledLine } from "./style";

const Chart = (props) => {
  const labels = Object.keys(
    props.chartData.datasets.reduce((acc, el) => {
      if (el.data) {
        el.data.forEach((datapoint) => {
          if (!acc[datapoint.x]) {
            acc[datapoint.x] = datapoint.x;
          }
        });
      }

      return acc;
    }, {})
  ).filter((d) => {
    return Number(d) >= props.startRange && Number(d) <= props.endRange;
  });

  const parsedData = props.chartData.datasets.reduce((acc, el) => {
    const newData = el.data.filter((d) => {
      return Number(d.x) >= props.startRange && Number(d.x) <= props.endRange;
    });

    return [...acc, { ...el, data: newData }];
  }, []);

  return (
    <Container>
      {props.chartData && props.isLine && (
        <StyledLine
          data={{ datasets: parsedData, labels }}
          options={{ maintainAspectRatio: false }}
          responsive="true"
        />
      )}
      {props.chartData && !props.isLine && (
        <StyledBar
          data={{ datasets: parsedData, labels }}
          options={{ maintainAspectRatio: false }}
          responsive="true"
        />
      )}
    </Container>
  );
};

export default Chart;
